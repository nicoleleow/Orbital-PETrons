import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';

import { PetInfoCard } from "./components/pet-info-card.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const AdoptPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-left: 120px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

const SearchContainer = styled(Searchbar)`
  margin: 10px;
  margin-horizontal: 20px;
  background-color: white;
`

const PetListContainer = styled(ScrollView)`
  // flex-direction: row;  
  flex: 1;
  padding: 5px;
  margin-bottom: 10px;
`

export const AdoptPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  // need to create availablePets.js to get list of available pets and their details (ie database of pets)
  // const filteredPets = availablePets.filter(pet => {
  //   return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
  // })
  
  return (

    <SafeArea>
      <View>
        <AdoptPageHeader>ADOPT A PET</AdoptPageHeader>
        <SearchContainer
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
        
      </View>
      <PetListContainer>
        <PetInfoCard />
        <PetInfoCard />
        <PetInfoCard />
      </PetListContainer>
  
    </SafeArea>
  )
};
