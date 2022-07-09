import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, FlatList, Dimensions, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from "../../../components/spacer/spacer.component";
import { StoriesPostCard } from "./components/stories-post-card.component";
import { Avatar } from "react-native-paper";

import { GetStoriesData, storiesList, GetPostIDs, postIDList } from "../../../../firebase/firebase-config"

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const UploadPostContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  background-color: white;
  border-radius: 7px;
  padding-horizontal: 10px;
  margin-horizontal: ${(props) => props.theme.space[4]};
`

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const StoriesPage = ({ navigation }) => {
  GetStoriesData();

  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    GetStoriesData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  return (
    <SafeArea>
      <Text variant='header'>Share Stories</Text>
      <UploadPostContainer>
        <Avatar.Image size={40} source={{ uri: pfp }} color="green" />
        <Spacer size='xLarge' position='right' />
        <TouchableOpacity onPress={() => navigation.navigate("CreatePostScreen")} style={{ width: 300, height: 50, justifyContent: 'center'}}>
          <Text style={{color: '#777'}}>Share your story...</Text>
        </TouchableOpacity> 
      </UploadPostContainer>
      <Spacer size='medium' />
      <FlatList
        data={storiesList}
        renderItem={(item) => (
          <StoriesPostCard storyDetails={item.item} />
        )}
        keyExtractor={(item) => item.date}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}
      /> 
    </SafeArea>
  )
};
