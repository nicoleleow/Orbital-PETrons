import React, {useState, useEffect} from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { View, TouchableOpacity } from 'react-native';
import { Text } from "../../../../components/typography/text.component"
import styled from 'styled-components';
import {
  collection,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore/lite";
import Icon from "react-native-vector-icons/Ionicons";

import {
  Months
} from "./stories-post-card.styles";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { db, authentication } from '../../../../../firebase/firebase-config';

const BubbleText = styled(Text)`
  color: white;
`

export const CommentBubble = ({ postID, commentDetails, storyDetails, navigation }) => {
  const commentDate = commentDetails.item.date;
  const commentEmail = commentDetails.item.email;
  const commentText = commentDetails.item.commentText;

  const currentUserEmail = authentication.currentUser?.email;

  const { date, hour, minutes, postImage, postText,
    userName, edited, email, likedUsers, comments } = storyDetails;

  const [username, setUsername] = useState('');
  const GetUsername = async (inputEmail) => {
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
    if (doc.data().email === inputEmail) {
      setUsername(doc.data().username);
      }
    })
  }

  const DeleteCommentAlert = () => {
    Alert.alert(
      "Delete Comment?",
      "Are you sure you want to delete this comment",
        [
          {
            text: "Cancel"
          },
          {
            text: "Delete",
            onPress: {UpdateFirebaseCommentsArr},
          },
        ]
      )
  }

  const [tempCommentsList, setTempCommentsList] = useState([]);
  const GetDBCommentsArray = async () => {
    const Snapshot = await getDocs(collection(db, "stories"));
    Snapshot.forEach((doc) => {
    if (doc.id === postID) {
      setTempCommentsList(doc.data().comments);
      }
    })
  }

  const UpdateFirebaseCommentsArr = async () => {
    tempCommentsList = tempCommentsList.filter( details =>
      details.date !== commentDate
      && details.commentText !== commentText
      && details.email !== commentEmail);
    // update stories db
    const editedDoc = doc(db, "stories", postID);
    await setDoc(editedDoc, {
      date,
      edited,
      email,
      hour,
      minutes,
      postImage,
      postText,
      userName: username,
      likedUsers,
      comments: tempCommentsList,
    });
  };
    
  const formattedDateWhole = new Date(commentDate.seconds * 1000 + 28800 * 1000)
  const day = formattedDateWhole.getDate().toString();
  const month = Months[formattedDateWhole.getMonth()];
  const year = formattedDateWhole.getFullYear().toString();
  const formattedDate = day + ' ' + month + ' ' + year;

  useEffect(() => {
    GetUsername(commentEmail);
    // get comments array for setting data
    GetDBCommentsArray();
  });

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: '#2e64e5',
        borderRadius: 10,
        padding: 10,
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <BubbleText style={{ fontWeight: 'bold', fontSize: 17 }}>{username}</BubbleText>
        <BubbleText
          style={{ paddingTop: 5, fontSize: 13 }}
        >
          {formattedDate}
        </BubbleText>
      </View>
      <Spacer size='small' />
      <View style={{ flexDirection: 'row' }}>
        <View style={{flex: 15}}>
          <BubbleText style={{ fontSize: 15 }}>{commentText}</BubbleText>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {commentEmail === currentUserEmail && (
            <TouchableOpacity
              style={{ fontSize: 10 }}
              onPress={DeleteCommentAlert}>
              <Icon
                name="trash-sharp"
                size={15} color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}
    