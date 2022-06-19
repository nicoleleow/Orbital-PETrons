import React, {useState, useCallback} from "react";
import { View, TextInput, TouchableOpacity, RefreshControl, Modal, FlatList, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from '../../../components/spacer/spacer.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from "react-native-dropdown-picker";

import { PetInfoCard } from "./components/pet-info-card.component";
import { GetPetsData, petsList } from "../../../../firebase/firebase-config"

import {
  SafeArea,
  MainContainer,
  SearchInputContainer,
  PetCategoriesContainer,
  PetCategoriesButton,
  PetCategoriesNames,
  ModalContent,
  ModalConfirmButton,
  ModalConfirmText
} from "./adopt.screen.styles";

import {
  PetTypes,
  Ages,
  Genders,
  Organisations,
  HDBApprovedStatus,
  Fees
} from "./components/pet-filter-categories";

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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    filterPets(categoryIndexFiltered, search);
    console.log('refreshed')
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [pets, setPets] = useState(petsList);
  const [filteredPets, setFilteredPets] = useState(petsList);
  const [categoryIndexFiltered, setCategoryIndexFiltered] = useState(0);
  const [search, setSearch] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  // FOR FILTERING BY ANIMAL TYPE BUTTONS
  const PetCategories = [
    { name: 'ALL', animalType: 'all', icon: 'gamepad-circle'},
    { name: 'CATS', animalType: 'cat', icon: 'cat' },
    { name: 'DOGS', animalType: 'dog', icon: 'dog' },
    { name: 'BIRDS', animalType: 'bird', icon: 'bird' },
    { name: 'RABBITS', animalType: 'rabbit', icon: 'rabbit' },
    { name: 'FISH', animalType: 'fish', icon: 'fish' },
    { name: 'OTHERS', animalType: 'others', icon: 'grain' } 
  ];
  
  // FOR FILTERING THROUGH MODAL
  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState("Animal Type");
  const [petType, setPetType] = useState(PetTypes);

  const [openAge, setOpenAge] = useState("");
  const [valueAge, setValueAge] = useState("Age");
  const [petAge, setPetAge] = useState(Ages);
  
  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState("Gender");
  const [petGender, setPetGender] = useState(Genders);
  
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [valueOrganisation, setValueOrganisation] = useState("Ownership Type");
  const [petOrganisation, setPetOrganisation] = useState(Organisations);
  
    const [openHDB, setOpenHDB] = useState(false);
    const [valueHDB, setValueHDB] = useState("HDB Approved Status");
    const [petHDB, setPetHDB] = useState(HDBApprovedStatus);

  const [openFee, setOpenFee] = useState(false);
  const [valueFee, setValueFee] = useState(0);
  const [petFee, setPetFee] = useState(Fees);

  const filterPets = (index, text) => {
    console.log('here', valueType, valueAge, valueGender, valueOrganisation, valueHDB, valueFee)
    setSearch(text);
    setCategoryIndexFiltered(index);
    // filter by category
    var newList = pets.filter(
      item =>
        PetCategories[index].animalType.toUpperCase() === 'ALL' ? pets
          : item?.type?.toUpperCase() == PetCategories[index].animalType.toUpperCase());
    
    //filter by text (pet's name)
    newList = newList.filter(item => item?.name?.toUpperCase().includes(text.toUpperCase()));
    
    // filter by animal type
    newList = newList.filter(
      item =>
        valueType === 'Animal Type' ? newList
          : item?.type?.toUpperCase() == valueType.toUpperCase());
    
    // filter by age

    
    // filter by gender
    newList = newList.filter(
      item =>
        (valueGender === 'Gender') ? newList
          : item?.gender?.toUpperCase() == valueGender.toUpperCase());

    // filter by ownership type
    newList = newList.filter(
      item =>
        (valueOrganisation === 'Ownership Type') ? newList
          : item?.organisation?.toUpperCase() == valueOrganisation.toUpperCase());
    
    // filter by hdb approved status
    newList = newList.filter(
      item =>
        (valueHDB === 'HDB Approved Status') ? newList
          : item?.HDB_approved?.toUpperCase() == valueHDB.toUpperCase());
    
    // filter by fees
    
    setFilteredPets(newList);
  }

  const cancelFilters = async () => {
    setModalVisible(false)
    setValueType("Animal Type");
    setValueAge("Age");
    setValueGender("Gender");
    setValueOrganisation("Ownership Type");
    setValueHDB("HDB Approved Status");
    setValueFee("Fees");
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
            onChangeText={(text) => filterPets(categoryIndexFiltered, text)}
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
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                  <Text style={{ textAlign: "center", fontSize: 30 }}>Filter</Text>
                  <Icon name='filter' size={30} />
                </View>
                <Spacer size='large' />
                <>
                  <DropDownPicker
                    zIndex={500}
                    placeholder="Animal Type"
                    open={openType}
                    value={valueType}
                    items={petType}
                    setOpen={setOpenType}
                    setValue={setValueType}
                    setItems={setPetType}
                    listMode="SCROLLVIEW"
                  />
                  <Spacer size='large' />
                  <DropDownPicker
                    zIndex={400}
                    placeholder="Age"
                    open={openAge}
                    value={valueAge}
                    items={petAge}
                    setOpen={setOpenAge}
                    setValue={setValueAge}
                    setItems={setPetAge}
                    listMode="SCROLLVIEW"
                  />
                  <Spacer size='large' />
                  <DropDownPicker
                    zIndex={300}
                    placeholder="Gender"
                    open={openGender}
                    value={valueGender}
                    items={petGender}
                    setOpen={setOpenGender}
                    setValue={setValueGender}
                    setItems={setPetGender}
                    listMode="SCROLLVIEW"
                  />
                  <Spacer size='large' />
                  <DropDownPicker
                    zIndex={200}
                    placeholder="Ownership Type"
                    open={openOrganisation}
                    value={valueOrganisation}
                    items={petOrganisation}
                    setOpen={setOpenOrganisation}
                    setValue={setValueOrganisation}
                    setItems={setPetOrganisation}
                    listMode="SCROLLVIEW"
                  />
                  <Spacer size='large' />
                  <DropDownPicker
                    zIndex={100}
                    placeholder="HDB Approved Status"
                    open={openHDB}
                    value={valueHDB}
                    items={petHDB}
                    setOpen={setOpenHDB}
                    setValue={setValueHDB}
                    setItems={setPetHDB}
                    listMode="SCROLLVIEW"
                  />
                  <Spacer size='large' />
                  <DropDownPicker
                    zIndex={10}
                    placeholder="Fees"
                    open={openFee}
                    value={valueFee}
                    items={petFee}
                    setOpen={setOpenFee}
                    setValue={setValueFee}
                    setItems={setPetFee}
                    listMode="SCROLLVIEW"
                  />
                </>
              </View>
              <Spacer size='xLarge' />
              <Spacer size='small' />
              <View style={{flexDirection: 'row'}} zIndex={1}>
                <ModalConfirmButton
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ModalConfirmText>Remove Filters</ModalConfirmText>
                </ModalConfirmButton>
                <Spacer size='large' position='right' />
                <ModalConfirmButton
                  onPress={() => setModalVisible(false)}
                >
                  <ModalConfirmText>Apply Filters</ModalConfirmText>
                </ModalConfirmButton>
              </View>
              <Spacer size='large' />
              <ModalConfirmButton
                  onPress={cancelFilters}
                >
                <ModalConfirmText>Cancel</ModalConfirmText>
              </ModalConfirmButton>
            </ModalContent>
          </Modal>
          <Icon
            raised
            name="sort-ascending"
            size={24} color={'#777'}
            onPress={() => setModalVisible(true)}
          />
        </SearchInputContainer>

        <PetCategoriesContainer horizontal={true}>
          {PetCategories.map((item, index) => (
            <View key={"pet" + index}>
              <PetCategoriesButton
                  onPress={() => {
                    setSelectedCategoryIndex(index);
                    filterPets(index, search);
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
      <FlatList
        data={filteredPets}
        renderItem={(item) => (
          <TouchableOpacity onPress={() => navigation.navigate('PetInfo', {item})}>
            <PetInfoCard pet={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ marginHorizontal: ((Dimensions.get('window').width - 382) / 2) }}
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
