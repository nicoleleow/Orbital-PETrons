import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { Text } from "../../components/typography/text.component";
import { AdoptionInfoCard } from "./adoption-info-card";
import { petsList, GetPetsData } from "../../../firebase/firebase-config";
import { authentication } from "../../../firebase/firebase-config";

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
  GetPetsData();
  const filteredList = petsList.filter((obj) => {
    return obj.email === authentication.currentUser?.email;
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
            <TouchableOpacity>
              <AdoptionInfoCard pet={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeArea>
    </DismissKeyboard>
  );
};
