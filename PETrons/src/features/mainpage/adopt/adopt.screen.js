import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";

import { PetInfoCard } from "./components/pet-info-card.component";
import { GetPetsData, petsList } from "../../../../firebase/firebase-config";

import {
  SafeArea,
  MainContainer,
  SearchInputContainer,
  PetCategoriesContainer,
  PetCategoriesButton,
  PetCategoriesNames,
  ModalContent,
  ModalConfirmButton,
  ModalConfirmText,
} from "./adopt.screen.styles";

import {
  PetCategories,
  Ages,
  Genders,
  Organisations,
  HDBApprovedStatus,
  Fees,
} from "./components/pet-filter-categories";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const AdoptPage = ({ navigation }) => {
  const filterList = petsList.filter((obj) => {
    return obj.status === "available";
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    GetPetsData();
    setFilteredPets(filterList);
    filterPets(categoryIndexFiltered, search);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [pets, setPets] = useState(petsList);
  const [filteredPets, setFilteredPets] = useState(filterList);
  const [categoryIndexFiltered, setCategoryIndexFiltered] = useState(0);
  const [search, setSearch] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  // FOR FILTERING THROUGH MODAL
  const [openAge, setOpenAge] = useState(false);
  const [valueAge, setValueAge] = useState(0);
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
    setSearch(text);
    setCategoryIndexFiltered(index);
    // filter by category
    var newList = petsList.filter((item) =>
      PetCategories[index].animalType.toUpperCase() === "ALL"
        ? pets
        : item[1]?.type?.toUpperCase() ==
          PetCategories[index].animalType.toUpperCase()
    );

    //filter by text (pet's name and breed)
    newList = newList.filter(
      (item) =>
        item[1]?.name?.toUpperCase().includes(text.toUpperCase()) ||
        item[1]?.breed?.toUpperCase().includes(text.toUpperCase())
    );
    // filter by age
    newList = newList.filter((item) => {
      if (valueAge === 0 || valueAge === "Age") {
        return newList;
      } else if (valueAge === 6) {
        return item[1]?.totalMonths <= 6;
      } else if (valueAge === 12) {
        return item[1]?.totalMonths >= 7 && item[1]?.totalMonths <= 12;
      } else if (valueAge === 36) {
        return item[1]?.totalMonths >= 13 && item[1]?.totalMonths <= 36;
      } else if (valueAge === 72) {
        return item[1]?.totalMonths >= 37 && item[1]?.totalMonths <= 72;
      } else if (valueAge === 108) {
        return item[1]?.totalMonths >= 73 && item[1]?.totalMonths <= 108;
      } else {
        return item[1]?.totalMonths > 108;
      }
    });

    // filter by gender
    newList = newList.filter((item) =>
      valueGender === "Gender"
        ? newList
        : item[1]?.gender?.toUpperCase() == valueGender.toUpperCase()
    );

    // filter by ownership type
    newList = newList.filter((item) =>
      valueOrganisation === "Ownership Type"
        ? newList
        : item[1]?.organisation?.toUpperCase() ==
          valueOrganisation.toUpperCase()
    );

    // filter by hdb approved status
    newList = newList.filter((item) =>
      valueHDB === "HDB Approved Status"
        ? newList
        : item[1]?.HDB_approved?.toUpperCase() == valueHDB.toUpperCase()
    );

    // filter by fees
    newList = newList.filter((item) => {
      if (valueFee === 0) {
        return newList;
      } else if (valueFee === 20) {
        return item[1]?.fee <= 20;
      } else if (valueFee === 50) {
        return item[1]?.fee >= 21 && item[1]?.fee <= 50;
      } else if (valueFee === 100) {
        return item[1]?.fee >= 51 && item[1]?.fee <= 100;
      } else if (valueFee === 150) {
        return item[1]?.fee >= 101 && item[1]?.fee <= 150;
      } else if (valueFee === 200) {
        return item[1]?.fee >= 151 && item[1]?.fee <= 200;
      } else {
        return item[1]?.fee > 200;
      }
    });

    setFilteredPets(newList);
    return filteredPets;
  };

  const removeAllFilters = async () => {
    setValueAge(0);
    setValueGender("Gender");
    setValueOrganisation("Ownership Type");
    setValueHDB("HDB Approved Status");
    setValueFee(0);
  };

  useEffect(() => {
    GetPetsData();
    setFilteredPets(filterList);
    filterPets(categoryIndexFiltered, search);
  }, []);

  return (
    <SafeArea>
      <Text variant="header">Adopt A Pet</Text>
      <MainContainer>
        <SearchInputContainer>
          <Icon name="magnify" size={24} color={"#777"} />
          <Spacer size="medium" position="right" />
          <TextInput
            placeholderTextColor={"#777"}
            placeholder="Search for pet name or breed"
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 30 }}>
                    Filter
                  </Text>
                  <Icon name="filter" size={30} />
                </View>
                <Spacer size="large" />
                <>
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
                  <Spacer size="large" />
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
                  <Spacer size="large" />
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
                  <Spacer size="large" />
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
                  <Spacer size="large" />
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
              <Spacer size="xLarge" />
              <Spacer size="small" />
              <View style={{ flexDirection: "row" }} zIndex={1}>
                <ModalConfirmButton onPress={removeAllFilters}>
                  <ModalConfirmText>Remove Filters</ModalConfirmText>
                </ModalConfirmButton>
                <Spacer size="large" position="right" />
                <ModalConfirmButton
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ModalConfirmText>Apply</ModalConfirmText>
                </ModalConfirmButton>
              </View>
              <Spacer size="large" />
            </ModalContent>
          </Modal>
          <Icon
            raised
            name="sort-ascending"
            size={24}
            color={"#777"}
            onPress={() => setModalVisible(true)}
          />
        </SearchInputContainer>

        <PetCategoriesContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {PetCategories.map((item, index) => (
            <View key={"pet" + index}>
              <PetCategoriesButton
                onPress={() => {
                  setSelectedCategoryIndex(index);
                  filterPets(index, search);
                }}
                style={{
                  backgroundColor:
                    selectedCategoryIndex == index ? "#e36414" : "white",
                }}
              >
                <Icon
                  name={item.icon}
                  size={30}
                  color={selectedCategoryIndex == index ? "white" : "#e36414"}
                />
              </PetCategoriesButton>
              <PetCategoriesNames>{item.name}</PetCategoriesNames>
            </View>
          ))}
        </PetCategoriesContainer>
      </MainContainer>
      <Spacer size="small" />
      <FlatList
        data={filteredPets}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PetInfo", { item })}
          >
            <PetInfoCard pet={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          marginHorizontal: (Dimensions.get("window").width - 382) / 2,
        }}
        keyExtractor={(item) => item[0]}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeArea>
  );
};
