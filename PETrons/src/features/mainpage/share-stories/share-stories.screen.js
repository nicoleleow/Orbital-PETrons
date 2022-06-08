import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const StoriesPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-left: 120px;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const StoriesPage = () => {

  return (
    <SafeArea>

      <View>
        <StoriesPageHeader>Share Stories</StoriesPageHeader>
      </View>

      <ScrollView>
        {/* add stories here */}
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
        </Text>
      </ScrollView>
      
      
    </SafeArea>
  )
};


