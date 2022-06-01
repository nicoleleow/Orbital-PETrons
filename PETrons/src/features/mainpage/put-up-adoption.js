import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const PutUpAdoptionPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[5]};
  padding-left: 120px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const PutuPAdoptionPage = () => (
  <SafeArea>
    <View>
      <PutUpAdoptionPageHeader>Put Up A Pet</PutUpAdoptionPageHeader>
    </View>
  </SafeArea>
);
