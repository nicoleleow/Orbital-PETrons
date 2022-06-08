import React from "react";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

export const FAQPage = () => (
  <SafeArea>
    <View>
      <Text variant='header'>FAQ</Text>
    </View>
  </SafeArea>
);
