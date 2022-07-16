import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import {
  collection,
  getDocs
} from "firebase/firestore/lite";

import { db } from '../../../../firebase/firebase-config';
import Icon from "react-native-vector-icons/AntDesign";

export const LikedUsersBubble = ({ userEmail, navigation }) => {
  
  const [username, setUsername] = useState('');
  const GetUsername = async () => {
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
    if (doc.data().email === userEmail) {
      setUsername(doc.data().username);
      }
    })
  }

  useEffect(() => {
    GetUsername();
  }, []);

  return (
    <View
      style={{
        marginHorizontal: 5,
        padding: 10,
        borderBottomColor: '#777',
        borderBottomWidth: 1
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name="caretright"
          style={{paddingTop: 5}}
        />
        <Spacer size='medium' position='right' />
        <Text style={{ fontSize: 17 }}>{username}</Text>
      </View>
    </View>
  )
}
    