import React from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';

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
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      <ScrollView>
        <Text style={styles.container}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
        </Text>
      </ScrollView>
    </SafeArea>
  )
};

const styles = StyleSheet.create({
  search: {
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: '#D3D3D3',
  },
  container: {
    fontSize: 50,
    backgroundColor: 'yellow'
  }
})