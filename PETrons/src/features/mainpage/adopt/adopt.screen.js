import React, {useState, useCallback} from "react";
import { View, TextInput, TouchableOpacity, RefreshControl, Modal, StyleSheet, Pressable } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from '../../../components/spacer/spacer.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { PetInfoCard } from "./components/pet-info-card.component";
import { GetPetsData, petsList } from "../../../../firebase/firebase-config"
import { FilterPetsModalDetails } from "./components/pet-filter-modal.component";

import {
  SafeArea,
  MainContainer,
  SearchInputContainer,
  PetCategoriesContainer,
  PetCategoriesButton,
  PetCategoriesNames,
  PetList,
  ModalContent
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
  GetPetsData();

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [pets, setPets] = useState(petsList);
  const [filteredPets, setFilteredPets] = useState(petsList);
  const [search, setSearch] = useState('');
  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const PetCategories = [
    {name: 'ALL', animalType: 'all', icon: 'gamepad-circle'},
    {name: 'CATS', animalType: 'cat', icon: 'cat'},
    {name: 'DOGS', animalType: 'dog', icon: 'dog'},
    {name: 'BIRDS', animalType: 'bird', icon: 'bird'},
    {name: 'RABBITS', animalType: 'rabbit', icon: 'rabbit'},
  ];
  
  const filterPetCategory = index => {
    const newPets = filteredPets.filter(
      item =>
        PetCategories[index].animalType.toUpperCase() === 'ALL' ? pets
          : item?.type?.toUpperCase() == PetCategories[index].animalType.toUpperCase());
    setFilteredPets(newPets);
  };
  
  const filterPetName = text => {
    console.log('under filterPetName, text is', text)
    if (text) {
      const newPets = filteredPets.filter(
        item => item?.name?.toUpperCase().includes(text.toUpperCase()));
      setFilteredPets(newPets);
      setSearch(text);
    } else {
      setFilteredPets(filteredPets);
      setSearch(text);
    }
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ModalContent>
              <View zIndex={100}>
                <FilterPetsModalDetails />
              </View>
              <Spacer size='xLarge' />
              <Spacer size='small' />
              <View style={{flexDirection: 'row'}} zIndex={1}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Spacer size='large' position='right' />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Apply Filters</Text>
                </Pressable>
              </View>
            </ModalContent>
          </Modal>
          <Icon
            raised
            name="sort-ascending"
            size={24} color={'#777'}
            onPress={() => setModalVisible(true)}
          />
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
                        selectedCategoryIndex == index ? '#e36414' : 'white'
                  }}
              >
                  <Icon
                    name={item.icon}
                    size={30}
                    color={
                      selectedCategoryIndex == index ? 'white' : '#e36414'
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});