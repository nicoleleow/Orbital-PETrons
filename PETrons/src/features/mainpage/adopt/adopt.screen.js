import React from "react";
import { View, TextInput, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from '../../../components/spacer/spacer.component';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { PetInfoCard } from "./components/pet-info-card.component";

import { GetPetsData, petsList } from "../../../../firebase/firebase-config"

import {
  SafeArea,
  MainContainer,
  SearchInputContainer,
  PetCategoriesContainer,
  PetCategoriesButton,
  PetCategoriesNames,
  PetList
} from "./adopt.screen.styles";

const AdoptPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-left: 120px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export const AdoptPage = ({ navigation }) => {
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = query => setSearchQuery(query);

  // need to create availablePets.js to get list of available pets and their details (ie database of pets)
  // const filteredPets = availablePets.filter(pet => {
  //   return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
  // })
  GetPetsData();

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [pets, setPets] = React.useState(petsList);
  const [filteredPets, setFilteredPets] = React.useState(petsList);
  const [search, setSearch] = React.useState('');
  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const PetCategories = [
  {name: 'ALL', animalType: 'all', icon: 'gamepad-circle'},
  {name: 'CATS', animalType: 'cat', icon: 'cat'},
  {name: 'DOGS', animalType: 'dog', icon: 'dog'},
  {name: 'BIRDS', animalType: 'bird', icon: 'bird'},
  {name: 'RABBITS', animalType: 'rabbit', icon: 'rabbit'},
];
  
  const filterPetCategory = index => {
    const newPets = pets.filter(
      item =>
        PetCategories[index].animalType.toUpperCase() === 'ALL' ? pets
          : item?.type?.toUpperCase() == PetCategories[index].animalType.toUpperCase());
    setFilteredPets(newPets);
  };
  
  const filterPetName = text => {
    const newPets = petsList.filter(
      item => item?.name?.toUpperCase().includes(text.toUpperCase()));
    setFilteredPets(newPets);
    setSearch(text);
  }
  
  return (
    <SafeArea>
      <Text variant='header'>Adopt A Pet</Text>
      <MainContainer>
        <SearchInputContainer>
          <Icon name="magnify" size={24} color={'#777'} />
          <Spacer size='medium' position='right' />
          <TextInput
            placeholderTextColor={'#777'}
            placeholder="Search for pet name"
            style={{ flex: 1 }}
            value={search}
            onChangeText={(text) => filterPetName(text)}
          />
          <Icon
            name="sort-ascending"
            size={24} color={'#777'} />
        </SearchInputContainer>

        <PetCategoriesContainer>
          {PetCategories.map((item, index) => (
            <View key={"pet" + index}>
              <PetCategoriesButton
                  onPress={() => {
                    setSelectedCategoryIndex(index);
                    filterPetCategory(index);
                  }}
                  style={
                      {backgroundColor:
                        selectedCategoryIndex == index
                          ? '#e36414'
                      : 'white'
                  }}
              >
                  <Icon
                    name={item.icon}
                    size={30}
                    color={
                      selectedCategoryIndex == index
                        ? 'white'
                        : '#e36414'
                    }
                  />
              </PetCategoriesButton>
              <PetCategoriesNames>{item.name}</PetCategoriesNames>
            </View>
          ))}
        </PetCategoriesContainer>
      </MainContainer>
      <Spacer size='small' />
      <PetList
        data={filteredPets}
        renderItem={(item) => (
          <TouchableOpacity onPress={() => navigation.navigate('PetInfo', {item})}>
            <PetInfoCard pet={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}
      />

    </SafeArea>
  )
}