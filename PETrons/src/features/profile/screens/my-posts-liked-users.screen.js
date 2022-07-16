import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, RefreshControl, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  SafeArea
} from "../../mainpage/share-stories/screens/create-post.styles";

import {
  collection,
  getDocs
} from "firebase/firestore/lite";
import { authentication, db } from "../../../../firebase/firebase-config";
import { LikedUsersBubble } from "../components/liked-users-bubble.component";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const LikedUsersScreen = ({ route, navigation }) => {
  const storyDetails = route.params.storyDetails[1];
  const postID = route.params.storyDetails[0];
  const { date, hour, minutes, postImage, postText,
    userName, edited, email, likedUsers, comments } = storyDetails;
  
  const currentUserEmail = authentication.currentUser?.email;

  const [tempLikedUsersList, setTempLikedUsersList] = useState([]);
  const [numLikes, setNumLikes] = useState(tempLikedUsersList.length);

  const GetDBLikedUsersArray = async () => {
    const Snapshot = await getDocs(collection(db, "stories"));
    Snapshot.forEach((doc) => {
    if (doc.id === postID) {
      setTempLikedUsersList(doc.data().likedUsers);
      setNumLikes(tempLikedUsersList.length);
      }
    })
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    GetDBLikedUsersArray();
    setNumLikes(tempLikedUsersList.length);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  useEffect(() => {
    GetDBLikedUsersArray();
  }, []);

  return (
    <DismissKeyboard>
      <SafeArea>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 10,
            paddingTop: 10
          }}>
          <Icon
            raised
            name="thumb-up"
            size={20}
            color="black"
          />
          <Spacer size='small' position='right' />
          {numLikes == 1 && (
            <Text style={{ paddingTop: 2}}>{numLikes} Like</Text>
          )}
          {numLikes != 1 && (
            <Text style={{ paddingTop: 2 }}>{numLikes} Likes</Text>
          )}
        </View>
        <FlatList
          data={tempLikedUsersList}
          renderItem={(item) => (
            <View>
              <LikedUsersBubble userEmail={item.item} />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              />}
          style={{
            backgroundColor: '#f0f0f0',
            marginBottom: 0,
            paddingTop: 10
          }}
        /> 
      </SafeArea>
    </DismissKeyboard>
  )
}
 