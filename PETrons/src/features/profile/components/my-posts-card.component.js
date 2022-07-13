import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Months, BottomContainer } from "../../mainpage/share-stories/components/stories-post-card.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db, userImage, getUserName } from "../../../../firebase/firebase-config";
import { Avatar, Button } from "react-native-paper";

import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const PostCard = styled(Card)`
  margin: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[1]};
`

const UserDetails = styled(View)`
    flex-direction: row;
    padding-horizontal: 15px;
`

const UserDetailsText = styled(Text)`
    font-size: 15px;
`

const PostDetails = styled(Card.Content)`
    padding-horizontal: 15px;
    padding-bottom: ${(props) => props.theme.space[3]};
    padding-top: ${(props) => props.theme.space[1]};
    display: flex;
`

const EditButton = styled(Button).attrs({
  color: colors.button.primary,
  position: 'absolute',
  marginTop: 15,
  right: 15
})`
  align-content: center;
  justify-content: center;
`;

export const MyPostsCard = ({ storyDetails, navigation }) => {
  const postID = storyDetails[0];
  const { date, hour, minutes, postImage, postText, userName, email, edited, numLikes } = storyDetails[1];

  const [pfp, setPfp] = useState(userImage);

  const formattedDateWhole = new Date(date.seconds * 1000 + 28800 * 1000)
  const day = formattedDateWhole.getDate().toString();
  const month = Months[formattedDateWhole.getMonth()];
  const year = formattedDateWhole.getFullYear().toString();
  const formattedDate = day + ' ' + month + ' ' + year;

  const timeOfDay = hour >= 12 ? 'PM' : 'AM'
  const timeTwelveHour = hour > 12 ? hour - 12 : (hour === 0) ? hour + 12 : hour
  const formattedHour = timeTwelveHour < 10 ? '0' + timeTwelveHour.toString() : timeTwelveHour;
  const formattedMinutes = (minutes < 10) ? ('0' + minutes.toString()) : minutes.toString();
  const formattedTime = formattedHour + ':' + formattedMinutes + ' ' + timeOfDay;

  const EditAlert = () =>
    Alert.alert("Edit?", "Are you sure you want to edit this post?", [
      {
        text: "Edit Caption",
        onPress: () => navigation.navigate("EditPostPage", {storyDetails}),
      },
      { text: "Delete Post", onPress: ConfirmDeleteAlert },
      {
        text: "Cancel",
      },
    ]);
  
  const ConfirmDeleteAlert = () =>
    Alert.alert("Delete?", "Are you sure you want to delete this post?", [
      { text: "Cancel" },
      {
        text: "Delete", onPress: DeleteData
      }
    ]);
  
  const DeleteData = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));
    let documentID;
    querySnapshot.forEach((doc) => {
      if (
        (doc.data().email === email) &
        (doc.data().date.seconds === date.seconds)
      ) {
        documentID = doc.id;
      }
    });
    await deleteDoc(doc(db, "stories", documentID));
    if (postImage !== null) {
      const uploadUri = postImage;
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      deleteObject(reference)
        .then(() => {})
        .catch((error) => {});
    }
  };

  const [url, setUrl] = useState();
  const [pfpURL, setPfpURL] = useState();
  useEffect(() => {
    const func = async () => {
    getUserName();
      if (pfp !== "default") {
        const uploadUri = userImage;
        const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference).then((x) => {
          setPfpURL(x);
        });
      }
    if (postImage !== null) {
      const uploadUri = postImage;
  
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
    <PostCard elevation={5}>
      <View>
        <Spacer size='xLarge' />
        <UserDetails>
          {pfp === "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={require("../../../../assets/default_profilepic.png")}
              size={45}
            />
            )}
            {pfp !== "default" && (
              <Avatar.Image
                backgroundColor="white"
                source={{ uri: pfpURL }}
                size={45}
              />
            )}
          <Spacer size='large' position='right' />
          <UserDetailsText>{userName}</UserDetailsText>
        </UserDetails>
        <Spacer size='medium' />
        <UserDetails>
          <UserDetailsText>{formattedDate}</UserDetailsText>
          <Spacer size='large' position='right' />
          <UserDetailsText>{formattedTime}</UserDetailsText>
          <Spacer size='large' position='right' />
          {edited && (
            <Text style={{color: '#777'}}>(edited)</Text>
          )}
        </UserDetails>
        <Spacer size='medium' />
        
      </View>
      <Spacer size='medium' />
      {postImage && (
        <View>
          <Image
            source={{ uri: url }}
            style={{ resizeMode: "contain", width: 360, height: 220, alignSelf: 'center'}}
          />
          <Spacer size='medium' />
        </View>
      )}
      {(postText !== '') && (
        <PostDetails>
          <Text>{postText}</Text>
        </PostDetails>
      )}
      <PostDetails>
        <BottomContainer style={{justifyContent: 'space-between'}}>  
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => console.log('like button pressed')}>
            <Icon
                raised
                name="thumb-up-outline"
                size={24} color={'#777'}
            />
            <Spacer size='medium' position='right' />
            <Text>{numLikes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => console.log('comment button pressed')}>
            <Icon
                raised
                name="comment-outline"
                size={24} color={'#777'}
            />
            <Spacer size='medium' position='right' />
            <Text>Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={EditAlert}>
            <Icon
                raised
                name="file-document-edit-outline"
                size={24} color={'#777'}
            />
            <Spacer size='medium' position='right' />
            <Text>Edit</Text>
          </TouchableOpacity>
        </BottomContainer>
      </PostDetails> 
    
    </PostCard>
  )
}