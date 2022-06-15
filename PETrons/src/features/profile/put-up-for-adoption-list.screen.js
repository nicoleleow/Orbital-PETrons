import React from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { AuthButton } from "../account/account.style";

import { Text } from "../../components/typography/text.component";
import { filteredList } from "./profile";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const PutUpAdoptionListPage = () => (
  <DismissKeyboard>
    <SafeArea>
      <View>
        <Text variant="header">LIST</Text>
        <AuthButton
          mode="contained"
          icon="logout"
          onPress={() => console.log(filteredList)}
        ></AuthButton>
      </View>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
    </SafeArea>
  </DismissKeyboard>
);
