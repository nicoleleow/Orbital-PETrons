import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';
import { Text } from "../../../components/typography/text.component"
import { Spacer } from '../../../components/spacer/spacer.component';

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
  margin: 0px 20px;
  margin-top: 10px;
  background-color: white;
`

const PetList = styled(FlatList).attrs({
  contentContainerStyle: {
    alignItems:'center'
  }
})``

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
        <Text variant='header'>ADOPT A PET</Text>
        <SearchContainer
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <Spacer size='medium' />
      <PetList
        data={
          [{ name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: 6 },
            { name: 7 },
            { name: 8},
            { name: 9 },
            { name: 10 },
            { name: 11 }
          ]}
        renderItem={() => <PetInfoCard />}
        keyExtractor={(item) => item.name}
        numColumns={2}
      />

      {/* <PetListContainer>
        <PetInfoCard />
      </PetListContainer> */}
  
    </SafeArea>
  )
};