import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";
import { AppNavigator } from "../../infrastructure/navigation/app.navigation";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const FavouritesPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[5]};
  padding-left: 120px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const FavouritesPage = () => (
  <SafeArea>
    <View>
      <FavouritesPageHeader>FAVOURITES</FavouritesPageHeader>
    </View>
  </SafeArea>
);
