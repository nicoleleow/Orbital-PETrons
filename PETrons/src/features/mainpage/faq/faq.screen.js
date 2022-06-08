import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const FAQPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-left: 170px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const FAQPage = () => (
  <SafeArea>
    <View>
      <FAQPageHeader>FAQ</FAQPageHeader>
    </View>
  </SafeArea>
);
