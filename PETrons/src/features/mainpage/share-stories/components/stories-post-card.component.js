import React, {useState, useEffect} from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { Text, View, Image } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-paper";
import {
  collection,
  getDocs,
} from "firebase/firestore/lite";

import {
  PostCard,
  UserDetails,
  PostDetails,
  Months,
  UserDetailsText,
  BottomContainer
} from "./stories-post-card.styles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db } from '../../../../../firebase/firebase-config';

export const StoriesPostCard = ({ storyDetails }) => {
  const { date, hour, minutes, postImage, postText, userName, edited } = storyDetails;
 
  const [pfp, setPfp] = useState('');
 
  let userPfp;
  const GetUserPfp = async (userName) => {
  const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
      if (doc.data().username === userName) {
        setPfp(doc.data().profilepic);
        userPfp = doc.data().profilepic;
      }
    });
  };

  GetUserPfp(userName);
  
  const [url, setUrl] = useState();
  const [pfpURL, setPfpURL] = useState();
  useEffect(() => {
    GetUserPfp(userName);
    const func = async () => {
      if (postImage !== null) {
        const uploadUri = postImage;
        const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference).then((x) => {
          setUrl(x);
        });
      }
      if (pfp !== "default") {
        const uploadUriPFP = pfp;
        const filenamePFP = uploadUriPFP.substring(uploadUriPFP.lastIndexOf("/") + 1);
        const storagePFP = getStorage();
        const referencePFP = ref(storagePFP, filenamePFP);
        await getDownloadURL(referencePFP).then((x) => {
          setPfpURL(x);
        });
      }
    };

      if (url == undefined || pfp === '') {
      func();
      }
  }, []);
  
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
  

  return (
    <PostCard elevation={5}>
      <View>
        <Spacer size='xLarge' />
        <UserDetails>
          {pfp === "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={require("../../../../../assets/default_profilepic.png")}
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
          <UserDetailsText style={{paddingTop: 5}}>{userName}</UserDetailsText>
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
        <BottomContainer>  
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}} onPress={() => console.log('like button pressed')}>
            <Spacer size='xLarge' position='right' />
            <Icon
                raised
                name="thumb-up-outline"
                size={24} color={'#777'}
            />
            <Spacer size='medium' position='right' />
            <Text>Like    </Text>
          </TouchableOpacity>
          <Spacer size='medium' position='right' />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}} onPress={() => console.log('comment button pressed')}>
            <Icon
                raised
                name="comment-outline"
                size={24} color={'#777'}
            />
            <Spacer size='medium' position='right' />
            <Text>Comment</Text>
          </TouchableOpacity>
        </BottomContainer>
      </PostDetails> 
    
    </PostCard>
  )
}
    