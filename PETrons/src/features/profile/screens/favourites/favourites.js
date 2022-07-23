import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Spacer } from "../../../../components/spacer/spacer.component";

import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Dimensions,
} from "react-native";

import {
  userFavouritesList,
  GetUserFavourites,
  favouritesDetails,
  GetFavouritesDetails,
} from "../../../../../firebase/firebase-config";
import { FavouritesCard } from "../../components/favourites-card.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { SafeArea } from "../../../../components/utility/safe-area.component";

const SearchInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: white;
  border-radius: 7px;
  border-color: grey;
  border-width: 0.5px;
  padding-horizontal: 20px;
  margin-horizontal: 20px;
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const FavouritesPage = ({ navigation }) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    GetUserFavourites();
    GetFavouritesDetails(userFavouritesList);
    filterPetName(search);
    setRefreshing(true);
    setFilteredPets(favouritesDetails);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [filteredPets, setFilteredPets] = useState(favouritesDetails);
  const [search, setSearch] = useState("");
  const filterPetName = (text) => {
    const newPets = favouritesDetails.filter((item) =>
      item[1]?.name?.toUpperCase().includes(text.toUpperCase())
    );
    setFilteredPets(newPets);
    setSearch(text);
  };

  useEffect(() => {
    GetUserFavourites();
    GetFavouritesDetails(userFavouritesList);
    filterPetName(search);
    setFilteredPets(favouritesDetails);
  }, []);

  return (
    <SafeArea>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text variant="header">Favourites</Text>
        <SearchInputContainer>
          <Icon name="magnify" size={24} color={"#777"} />
          <Spacer size="medium" position="right" />
          <TextInput
            placeholderTextColor={"#777"}
            placeholder="Search for pet name"
            style={{ flex: 1 }}
            value={search}
            onChangeText={(text) => filterPetName(text)}
          />
        </SearchInputContainer>
      </View>
      <Spacer size="medium" />
      <FlatList
        data={filteredPets}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PetInfo", { item })}
          >
            <FavouritesCard pet={item} navigation={navigation} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          marginHorizontal: (Dimensions.get("window").width - 382) / 2,
        }}
        keyExtractor={(item) => item[0]}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeArea>
  );
};
