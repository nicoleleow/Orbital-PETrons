import React from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';
import { Text } from "../../../components/typography/text.component"

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

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
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
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
