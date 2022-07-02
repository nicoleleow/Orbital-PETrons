import React, { useState } from "react";
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
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text } from "../../components/typography/text.component";
import { AdoptionInfoCard } from "./adoption-info-card";
import { petsList, GetPetsData } from "../../../firebase/firebase-config";
import { authentication } from "../../../firebase/firebase-config";
import { Spacer } from "../../components/spacer/spacer.component";

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
  margin-horizontal: ${(props) => props.theme.space[3]};
`;

export const PutUpAdoptionListPage = ({ navigation }) => {
  GetPetsData();
  const filteredList = petsList.filter((obj) => {
    return obj.email === authentication.currentUser?.email;
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    GetPetsData();
    const newFilteredList = petsList.filter((obj) => {
      return obj.email === authentication.currentUser?.email;
    });
    setFilteredPets(newFilteredList);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [filteredPets, setFilteredPets] = React.useState(filteredList);
  const [search, setSearch] = React.useState("");
  const filterPetName = (text) => {
    const newPets = filteredList.filter((item) =>
      item?.name?.toUpperCase().includes(text.toUpperCase())
    );
    setFilteredPets(newPets);
    setSearch(text);
  };

  return (
    <DismissKeyboard>
      <SafeArea>
        <View>
          <Text variant="header">MY LISTED ADOPTIONS</Text>
        </View>
        <SearchContainer>
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
        </SearchContainer>
        <AdoptionList
          data={filteredPets}
          renderItem={(item) => (
            <TouchableOpacity>
              <AdoptionInfoCard pet={item} navigation={navigation} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeArea>
    </DismissKeyboard>
  );
};
