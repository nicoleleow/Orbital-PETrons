import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text, 
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
} from "firebase/firestore/lite";

import { Spacer } from "../../../components/spacer/spacer.component";
import { db, authentication } from "../../../../firebase/firebase-config";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

export const EditPostPage = ({ route, navigation }) => {

  return (
    <SafeArea>
      <Text>hello</Text>
    </SafeArea>
  )
}