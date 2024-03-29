import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SafeArea } from "../../../../components/utility/safe-area.component";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  authentication,
  db,
  userUsername,
} from "../../../../../firebase/firebase-config";
import { CommentBubble } from "../components/comments-bubble.component";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const CommentTextInput = styled(TextInput)`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  padding: 10px;
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const CommentsScreen = ({ route, navigation }) => {
  const storyDetails = route.params.storyDetails[1];
  const postID = route.params.storyDetails[0];
  const {
    date,
    hour,
    minutes,
    postImage,
    postText,
    userName,
    edited,
    email,
    likedUsers,
    comments,
  } = storyDetails;

  const currentUserEmail = authentication.currentUser?.email;

  const [tempCommentsList, setTempCommentsList] = useState([]);
  const GetDBCommentsArray = async () => {
    const Snapshot = await getDocs(collection(db, "stories"));
    Snapshot.forEach((doc) => {
      if (doc.id === postID) {
        setTempCommentsList(doc.data().comments);
      }
    });
  };

  const [username, setUsername] = useState("");
  const GetUsername = async (inputEmail) => {
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
      if (doc.data().email === inputEmail) {
        setUsername(doc.data().username);
      }
    });
  };

  const [inputComment, setInputComment] = useState("");

  const UpdateFirebaseCommentsArr = async (updatedCommentsArr) => {
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
      comments: updatedCommentsArr,
    });
  };

  const UpdateTempCommentsArr = () => {
    // only add comment if not empty
    if (inputComment !== "") {
      setInputComment("");
      const commentDate = new Date();
      const newCommentDetails = {
        date: commentDate,
        email: currentUserEmail,
        commentText: inputComment,
      };
      tempCommentsList.push(newCommentDetails);
      UpdateFirebaseCommentsArr(tempCommentsList);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    GetDBCommentsArray();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  useEffect(() => {
    GetDBCommentsArray();
    GetUsername(currentUserEmail);
  }, []);

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  return (
    <DismissKeyboard>
      <SafeArea style={{backgroundColor: "#f0f0f0"}}>
        <FlatList
          data={tempCommentsList}
          renderItem={(item) => (
            <CommentBubble
              postID={postID}
              commentDetails={item}
              storyDetails={storyDetails}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            backgroundColor: "#f0f0f0",
            marginBottom: 70,
            paddingTop: 10,
          }}
        />
        <View
          style={{
            justifyContent: "flex-end",
            position: "absolute",
            bottom: keyboardOffset + 10,
            backgroundColor: "white",
            width: Dimensions.get("window").width,
            borderWidth: 1,
            borderColor: '#e6e6e6',
            marginBottom: 25
          }}
        >
          <Icon
            name="send-circle"
            style={{ position: "absolute", right: 5, top: 5 }}
            size={32}
            color={colors.ui.header}
            onPress={UpdateTempCommentsArr}
          />
          <CommentTextInput
            placeholder="Leave a comment..."
            textContentType="none"
            keyboardType="default"
            value={inputComment}
            onChangeText={setInputComment}
            maxLength={300}
            multiline={true}
            style={{
              width: Dimensions.get("window").width - 40,
            }}
          />
        </View>
      </SafeArea>
    </DismissKeyboard>
  );
};
