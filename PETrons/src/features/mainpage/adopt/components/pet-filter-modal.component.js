// import React, { useState } from "react";
// import { View, Text} from "react-native";
// import { Spacer } from "../../../../components/spacer/spacer.component";
// import Icon from 'react-native-vector-icons/Feather';
// import DropDownPicker from "react-native-dropdown-picker";

// import {
//   PetTypes,
//   Ages,
//   Genders,
//   Organisations,
//   HDBApprovedStatus,
//   Fees
// } from "./pet-filter-categories";

// export var filterType = "Animal Type";
// export var filterAge = "0";
// export var filterGender = "Gender";
// export var filterOwnership = "Ownership Type";
// export var filterHDBStatus = "HDB Approved Status";
// export var filterFee = "Fees";

// const setType = (type) => {
//   filterType = type;
//   // console.log('updated type value');
//   // console.log('');
// };
// const setAge = (age) => {
//   filterAge = age;
//   // console.log('updated age value');
//   // console.log('');
// };
// const setGender = (gender) => {
//   filterGender = gender;
//   // console.log('updated gender value');
//   // console.log('');
// };
// const setOwnership = (ownership) => {
//   filterOwnership = ownership;
//   // console.log('updated ownership value');
//   // console.log('');
// };
// const setHDBStatus = (status) => {
//   filterHDBStatus = status;
//   // console.log('updated hdb status value');
//   // console.log('');
// };
// const setFee = (fee) => {
//   filterFee = fee;
//   // console.log('updated fee value');
//   // console.log('');
// };

// export const FilterPetsModalDetails = () => {

//   const [openType, setOpenType] = useState(false);
//   const [valueType, setValueType] = useState("");
//   const [petType, setPetType] = useState(PetTypes);

//   const [openAge, setOpenAge] = useState("");
//   const [valueAge, setValueAge] = useState("");
//   const [petAge, setPetAge] = useState(Ages);
  
//   const [openGender, setOpenGender] = useState(false);
//   const [valueGender, setValueGender] = useState("");
//   const [petGender, setPetGender] = useState(Genders);

//   const [openHDB, setOpenHDB] = useState(false);
//   const [valueHDB, setValueHDB] = useState("");
//   const [petHDB, setPetHDB] = useState(HDBApprovedStatus);

//   const [openOrganisation, setOpenOrganisation] = useState(false);
//   const [valueOrganisation, setValueOrganisation] = useState("");
//   const [petOrganisation, setPetOrganisation] = useState(Organisations);

//   const [openFee, setOpenFee] = useState(false);
//   const [valueFee, setValueFee] = useState(0);
//   const [petFee, setPetFee] = useState(Fees);

//   return (
//     <>
//       <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
//         <Text style={{ textAlign: "center", fontSize: 30 }}>Filter</Text>
//         <Icon name='filter' size={30} />
//       </View>
//       <Spacer size='large' />
//       <>
//         <DropDownPicker
//           zIndex={500}
//           placeholder="Animal Type"
//           open={openType}
//           value={valueType}
//           items={petType}
//           setOpen={setOpenType}
//           setValue={setValueType}
//           setItems={setPetType}
//           listMode="SCROLLVIEW"
//           onOpen={setType(valueType)}
//         />
//         <Spacer size='large' />
//         <DropDownPicker
//           zIndex={400}
//           placeholder="Age"
//           open={openAge}
//           value={valueAge}
//           items={petAge}
//           setOpen={setOpenAge}
//           setValue={setValueAge}
//           setItems={setPetAge}
//           listMode="SCROLLVIEW"
//           onOpen={setAge(valueAge)}
//         />
//         <Spacer size='large' />
//         <DropDownPicker
//           zIndex={300}
//           placeholder="Gender"
//           open={openGender}
//           value={valueGender}
//           items={petGender}
//           setOpen={setOpenGender}
//           setValue={setValueGender}
//           setItems={setPetGender}
//           listMode="SCROLLVIEW"
//           onOpen={setGender(valueGender)}
//         />
//         <Spacer size='large' />
//         <DropDownPicker
//           zIndex={200}
//           placeholder="Ownership Type"
//           open={openOrganisation}
//           value={valueOrganisation}
//           items={petOrganisation}
//           setOpen={setOpenOrganisation}
//           setValue={setValueOrganisation}
//           setItems={setPetOrganisation}
//           listMode="SCROLLVIEW"
//           onOpen={setOwnership(valueOrganisation)}
//         />
//         <Spacer size='large' />
//         <DropDownPicker
//           zIndex={100}
//           placeholder="HDB Approved Status"
//           open={openHDB}
//           value={valueHDB}
//           items={petHDB}
//           setOpen={setOpenHDB}
//           setValue={setValueHDB}
//           setItems={setPetHDB}
//           listMode="SCROLLVIEW"
//           onOpen={setHDBStatus(valueHDB)}
//         />
//         <Spacer size='large' />
//         <DropDownPicker
//           zIndex={10}
//           placeholder="Fees"
//           open={openFee}
//           value={valueFee}
//           items={petFee}
//           setOpen={setOpenFee}
//           setValue={setValueFee}
//           setItems={setPetFee}
//           listMode="SCROLLVIEW"
//           onOpen={setFee(valueFee)}
//         />
//       </>
//     </>
//   )
// }
