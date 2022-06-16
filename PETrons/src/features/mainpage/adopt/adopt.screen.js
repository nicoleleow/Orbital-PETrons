import React from "react";
import { SafeAreaView, View, FlatList, TextInput, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from '../../../components/spacer/spacer.component';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pets } from "./pets";

import { PetInfoCard } from "./components/pet-info-card.component";

import { petsList } from "../mainpage.screen";

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

export const AdoptPage = ({ navigation }) => {
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = query => setSearchQuery(query);

  // need to create availablePets.js to get list of available pets and their details (ie database of pets)
  // const filteredPets = availablePets.filter(pet => {
  //   return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
  // })

  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [pets, setPets] = React.useState(Pets);
  const [filteredPets, setFilteredPets] = React.useState([]);

  const PetCategories = [
  {name: '   ALL', icon: 'gamepad-circle'},
  {name: '  CATS', icon: 'cat'},
  {name: '  DOGS', icon: 'dog'},
  {name: ' BIRDS', icon: 'bird'},
  {name: 'RABBITS', icon: 'rabbit'},
];
  
  const filterPet = index => {
    const currentPets = pets.filter(
      item => item?.pet?.toUpperCase() == PetCategories[index].name,
      )[0]?.pets;
    setFilteredPets(currentPets);
  };
  
  return (
    <SafeArea>
      <Text variant='header'>Adopt A Pet</Text>
      <MainContainer>
        <SearchInputContainer>
          <Icon name="magnify" size={24} color={'#777'} />
          <Spacer size='medium' position='right' />
          <TextInput
              placeholderTextColor={'#777'}
              placeholder="Search"
              style={{flex: 1}}
          />
          <Icon name="sort-ascending" size={24} color={'#777'} />
        </SearchInputContainer>

        <PetCategoriesContainer>
          {PetCategories.map((item, index) => (
            <View key={"pet" + index}>
              <PetCategoriesButton
                  onPress={() => {
                    setSeletedCategoryIndex(index);
                    filterPet(index);
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
        data={Pets}
        renderItem={(item) => (
          <TouchableOpacity onPress={() => navigation.navigate('PetInfo', {item})}>
            <PetInfoCard pet={item} />
          </TouchableOpacity>
        )}
          
        keyExtractor={(item) => item.name}
        numColumns={2}
      />
  
      {/* <TouchableOpacity onPress={() => console.log('hello', petsList)}>
          <Text>print data by pressing here</Text>
      </TouchableOpacity> */}

    </SafeArea>
  )
}