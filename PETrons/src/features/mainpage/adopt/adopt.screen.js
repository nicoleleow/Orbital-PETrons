import React from "react";
import { SafeAreaView, Text, View, FlatList} from "react-native";
import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';
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

// const PetListContainer = styled(View)` 
//   flex: 1;
//   padding: 5px;
//   margin-bottom: 10px;
// `

const PetList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16
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
        <AdoptPageHeader>ADOPT A PET</AdoptPageHeader>
        <Spacer size='small' />
        <SearchContainer
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
      </View>
      <Spacer size='medium' />
      <PetList
        data={[{name: 1}, {name: 2}]}
        renderItem={() => <PetInfoCard />}
        keyExtractor={(item) => item.name}
      />

      {/* <PetListContainer>
        <PetInfoCard />
      </PetListContainer> */}
  
    </SafeArea>
  )
};
