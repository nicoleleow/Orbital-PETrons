import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from "../../../components/spacer/spacer.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

export const StoriesPage = () => {

  return (
    <SafeArea>

      <View>
        <Text variant='header'>Share Stories</Text>
      </View>
      
    </SafeArea>
  )
};
