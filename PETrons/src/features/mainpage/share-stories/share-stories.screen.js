import React, { useState, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from "../../../components/spacer/spacer.component";
import { StoriesPostCard } from "./components/stories-post-card.component";
import { Avatar } from "react-native-paper";

import { GetStoriesData, storiesList, GetPostIDs, postIDList, userImage, getUserName } from "../../../../firebase/firebase-config";
import {
  getStorage,
  ref,
  getDownloadURL
} from "firebase/storage";

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
  const [pfp, setPfp] = useState(userImage)

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    GetStoriesData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  const [url, setUrl] = useState();
  useEffect(() => {
    const func = async () => {
      GetStoriesData();
      getUserName();
      if (pfp !== "default") {
        const uploadUri = userImage;
        const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference).then((x) => {
          setUrl(x);
        });
      }
    };
    if (url == undefined) {
      func();
    }
  }, []);

  return (
    <SafeArea>
      <Text variant='header'>Share Stories</Text>
      <UploadPostContainer>
        {userImage === "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={require("../../../../assets/default_profilepic.png")}
              size={45}
            />
          )}
          {userImage !== "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={{ uri: url }}
              size={45}
            />
          )}
        {/* <Avatar.Image size={45} source={require("../../../../assets/default_profilepic.png")} style={{backgroundColor: 'white'}} /> */}
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
