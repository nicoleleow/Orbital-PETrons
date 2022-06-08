import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";

const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[1]};
`;

const PutUpAdoptionPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.body};
`;

const FormButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
`;

const Background = styled.View`
  background-color: orange;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Inputs = styled(TextInput)`
  width: 300px;
  height: 45px;
`;

const DescriptionInput = styled(TextInput)`
  width: 300px;
  height: 90px;
  textalignvertical: "top";
`;

export const PutuPAdoptionPage = ({ navigation }) => {
  const [organisationType, setOrganisationType] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Background>
      <PutUpAdoptionPageHeader>
        Fill in your pet details:
      </PutUpAdoptionPageHeader>
      <Container>
        <FormButton
          icon="image"
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Upload Image
        </FormButton>
        <Spacer size="large">
          <Inputs
            label="Organisation"
            value={organisationType}
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => setOrganisationType(text)}
          />
        </Spacer>
        <Spacer size="large">
          <Inputs
            label="Pet Name"
            value={name}
            textContentType="name"
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => setName(text)}
          />
        </Spacer>
        <Spacer size="large">
          <Inputs
            label="Animal Type"
            value={type}
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => setType(text)}
          />
        </Spacer>
        <Spacer size="large">
          <Inputs
            label="Animal Breed"
            value={breed}
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => setBreed(text)}
          />
        </Spacer>
        <Spacer size="large">
          <Inputs
            label="Pet Gender"
            value={gender}
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => setGender(text)}
          />
        </Spacer>
        <Spacer size="large">
          <Inputs
            label="Age"
            value={age}
            textContentType="none"
            keyboardType="number-pad"
            onChangeText={(text) => setAge(text)}
          />
        </Spacer>
        <Spacer size="large">
          <Inputs
            label="Price"
            value={price}
            textContentType="none"
            keyboardType="number-pad"
            onChangeText={(text) => setPrice(text)}
          />
        </Spacer>
        <Spacer size="large">
          <DescriptionInput
            label="Short Description..."
            value={description}
            textContentType="none"
            autoCapitalize="none"
            keyboardType="default"
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          />
        </Spacer>
      </Container>
      <Spacer size="large">
        <FormButton mode="contained" onPress={() => navigation.goBack()}>
          Confirm
        </FormButton>
      </Spacer>
    </Background>
  );
};
