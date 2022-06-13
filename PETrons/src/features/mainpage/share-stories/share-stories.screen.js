import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"

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

      <ScrollView>
        {/* add stories here */}
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
        </Text>
      </ScrollView>
      
      
    </SafeArea>
  )
};
