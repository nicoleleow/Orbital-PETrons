import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from '../../../components/spacer/spacer.component';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pets } from "./pets";

const PetCategories = [
  {name: 'CATS', icon: 'cat'},
  {name: 'DOGS', icon: 'dog'},
  {name: 'BIRDS', icon: 'ladybug'},
  {name: 'BUNNIES', icon: 'rabbit'},
];

import { PetInfoCard } from "./components/pet-info-card.component";

import { petsList } from "../mainpage.screen";

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

const MainContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.brand.yellow1};
  border-radius: 5px;
  margin: 0 10px;
`

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`

const PetList = styled(FlatList).attrs({
  contentContainerStyle: {
  marginHorizontal: ((Dimensions.get('window').width - 382) / 2)
  }
})``

export const AdoptPage = ({ navigation }) => {
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = query => setSearchQuery(query);

  // need to create availablePets.js to get list of available pets and their details (ie database of pets)
  // const filteredPets = availablePets.filter(pet => {
  //   return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
  // })


  const [pets, setPets] = React.useState(Pets)

  
  return (
    <SafeArea>
      <Text variant='header'>Adopt A Pet</Text>
      <MainContainer>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={24} color={'#777'} />
          <Spacer size='medium' position='right' />
      
          <TextInput
              placeholderTextColor={'#777'}
              placeholder="Search"
              style={{flex: 1}}
          />
          <Icon name="sort-ascending" size={24} color={'#777'} />
        </View>
        
      </MainContainer>
      <Spacer size='medium' />
      <PetList
        data={petsList}
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
};


const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})