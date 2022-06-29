import React, { useState } from "react";
import { SafeAreaView, View, TextInput, Modal, TouchableOpacity, Dimensions, Alert } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from "../../../components/spacer/spacer.component";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { StoriesPostCard } from "./components/stories-post-card.component";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Navigation } from "../../../infrastructure/navigation";

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
  padding-horizontal: 20px;
  margin-horizontal: ${(props) => props.theme.space[4]};
`

export const StoriesPage = ({ navigation }) => {
  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';
  const username = 'testUsername1'

  return (
    <SafeArea>
      <View>
        <Text variant='header'>Share Stories</Text>
        <UploadPostContainer>
          <Avatar.Image size={40} source={{ uri: pfp }} color="green" />
          <Spacer size='large' position='right' />
          <TouchableOpacity onPress={() => navigation.navigate("CreatePostScreen")} style={{ width: 300, height: 50, justifyContent: 'center'}}>
            <Text style={{color: '#777'}}>Share your story...</Text>
          </TouchableOpacity> 
        </UploadPostContainer>

        <StoriesPostCard />
      </View>  
    </SafeArea>
  )
};
