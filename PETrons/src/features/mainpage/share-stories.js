import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const StoriesPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-left: 120px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const StoriesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  // need to create availablePets.js to get list of available pets and their details (ie database of pets)
  const filteredPets = availablePets.filter(pet => {
    return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
  })

  return (
    <SafeArea>

      <View>
        <StoriesPageHeader>Share Stories</StoriesPageHeader>
      </View>

      <View>
        <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
        />
      </View>
      
      
    </SafeArea>
  )
};


const styles = StyleSheet.create({
  search: {
    margin:40,
    backgroundColor: '#D3D3D3',
  }
})