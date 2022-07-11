import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Spacer } from "../../../../components/spacer/spacer.component";

import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from "react-native";

import { userFavouritesList, GetUserFavourites, favouritesDetails, GetFavouritesDetails } from "../../../../../firebase/firebase-config";
import { FavouritesCard } from "../../components/favourites-card.component";
import { PetInfoCard } from "../../../mainpage/adopt/components/pet-info-card.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SearchContainer = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[2]};
`;

const AdoptionList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const SearchInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: white;
  border-radius: 7px;
  padding-horizontal: 20px;
  margin-horizontal: ${(props) => props.theme.space[4]};
`;


export const FavouritesPage = ({ navigation }) => {
  GetUserFavourites();
  GetFavouritesDetails(userFavouritesList);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    GetUserFavourites();
    setFilteredPets(favouritesDetails);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [filteredPets, setFilteredPets] = useState(favouritesDetails);
  const [search, setSearch] = useState("");
  const filterPetName = (text) => {
    const newPets = favouritesDetails.filter((item) =>
      item?.name?.toUpperCase().includes(text.toUpperCase())
    );
    setFilteredPets(newPets);
    setSearch(text);
  };

  return (
    <DismissKeyboard>
      <SafeArea>
        <View>
          <Text variant='header'>Favourites</Text>
        </View>
        <SearchContainer>
          <SearchInputContainer>
            <Icon name="magnify" size={24} color={"#777"} />
            <Spacer size="medium" position="right" />
            <TextInput
              placeholderTextColor={"#777"}
              placeholder="Search for pet name"
              style={{flex: 1}}
              value={search}
              onChangeText={(text) => filterPetName(text)}
            />
          </SearchInputContainer>
        </SearchContainer>
        <AdoptionList
          data={filteredPets}
          renderItem={(item) => (
            <TouchableOpacity>
              <FavouritesCard pet={item} navigation={navigation} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item[0]}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeArea>
    </DismissKeyboard>
  )
};
