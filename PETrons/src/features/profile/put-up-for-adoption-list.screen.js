import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AdoptionInfoCard } from "./adoption-info-card";
import { petsList, GetPetsData } from "../../../firebase/firebase-config";
import { authentication } from "../../../firebase/firebase-config";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import { colors } from "../../infrastructure/theme/colors";
import { SafeArea } from "../../components/utility/safe-area.component";

const StatusCategories = [
  { name: "ALL", statusType: "all", icon: "gamepad-circle" },
  { name: "AVAILABLE", statusType: "available", icon: "check-circle-outline" },
  { name: "ADOPTED", statusType: "adopted", icon: "close-circle-outline" },
];

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

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
  border-color: grey;
  border-width: 0.5px;
  border-radius: 7px;
  padding-horizontal: 20px;
  margin-horizontal: ${(props) => props.theme.space[4]};
`;

const CategoriesContainer = styled(View)`
  flex-direction: row;
  margin-top: ${(props) => props.theme.space[4]};
  margin-horizontal: ${(props) => props.theme.space[2]};
  align-items: center;
  justify-content: center;
`;

const CategoriesButton = styled(TouchableOpacity)`
  height: 40px;
  width: 80px;
  align-items: center;
  justify-content: center;
  border-color: grey;
  border-width: 0.5px;
  border-radius: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => props.theme.space[4]};
`;

const CategoriesNames = styled(Text)`
  color: black;
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
  padding-horizontal: 5px;
  text-align: center;
`;

export const PutUpAdoptionListPage = ({ navigation }) => {
  GetPetsData();
  const filteredList = petsList.filter((obj) => {
    return obj[1].email === authentication.currentUser?.email;
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    GetPetsData();
    setFilteredPets(filteredList);
    filterPets(categoryIndexFiltered, search);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  });

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [categoryIndexFiltered, setCategoryIndexFiltered] = useState(0);
  const [filteredPets, setFilteredPets] = useState(filteredList);
  const [search, setSearch] = useState("");

  const filterPets = (index, text) => {
    setSearch(text);
    setCategoryIndexFiltered(index);
    var newList = filteredList.filter((item) =>
      StatusCategories[index].statusType.toUpperCase() === "ALL"
        ? filteredList
        : item[1]?.status?.toUpperCase() ==
          StatusCategories[index].statusType.toUpperCase()
    );
    newList = newList.filter((item) =>
      item[1]?.name?.toUpperCase().includes(text.toUpperCase())
    );
    setFilteredPets(newList);
    return filteredPets;
  };

  return (
    <DismissKeyboard>
      <SafeArea>
        <View>
          <Text variant="header">My Story Posts</Text>
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
              onChangeText={(text) => filterPets(categoryIndexFiltered, text)}
            />
          </SearchInputContainer>
        </SearchContainer>
        <CategoriesContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {StatusCategories.map((item, index) => (
            <View key={index}>
              <CategoriesButton
                onPress={() => {
                  setSelectedCategoryIndex(index);
                  filterPets(index, search);
                }}
                style={{
                  backgroundColor:
                    selectedCategoryIndex == index ? "#e36414" : "white",
                }}
              >
                <Icon
                  name={item.icon}
                  size={30}
                  color={selectedCategoryIndex == index ? "white" : "#e36414"}
                />
              </CategoriesButton>
              <CategoriesNames>{item.name}</CategoriesNames>
            </View>
          ))}
        </CategoriesContainer>
        <AdoptionList
          data={filteredPets}
          renderItem={(item) => (
            <TouchableOpacity>
              <AdoptionInfoCard pet={item} navigation={navigation} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item[0]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeArea>
    </DismissKeyboard>
  );
};
