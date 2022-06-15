import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { Text } from "../../components/typography/text.component";
import { filteredList } from "./profile";
import { AdoptionInfoCard } from "./adoption-info-card";

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

const AdoptionList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const PutUpAdoptionListPage = () => {
  return (
    <DismissKeyboard>
      <SafeArea>
        <View>
          <Text variant="header">YOUR LIST</Text>
        </View>
        <SearchContainer>
          <Searchbar />
        </SearchContainer>
        <AdoptionList
          data={filteredList}
          renderItem={(item) => (
            <TouchableOpacity onPress={() => console.log("hi")}>
              <AdoptionInfoCard pet={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      </SafeArea>
    </DismissKeyboard>
  );
};
