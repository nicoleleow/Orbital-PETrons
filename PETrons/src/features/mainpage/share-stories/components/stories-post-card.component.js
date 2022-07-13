import React, {useState, useEffect} from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { Text, View, Image } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from 'styled-components';
import { Avatar } from "react-native-paper";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc
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
import { db, authentication, userLikedPostsList, GetUserLikedPosts, userUsername } from '../../../../../firebase/firebase-config';

const LikesCommentsCount = styled(Text)`
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 5px;
`

const CountsContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 8px;
  margin-horizontal: 15px;
`

export const StoriesPostCard = ({ storyDetails }) => {
  const postID = storyDetails[0];
  const { date, hour, minutes, postImage, postText,
    userName, edited, email, numLikes } = storyDetails[1];
 
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
    GetUserLikedPosts();
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
      //   if (pfp !== "default") {
      //     const uploadUriPFP = pfp;
      //     const filenamePFP = uploadUriPFP.substring(uploadUriPFP.lastIndexOf("/") + 1);
      //     const storagePFP = getStorage();
      //     const referencePFP = ref(storagePFP, filenamePFP);
      //     await getDownloadURL(referencePFP).then((x) => {
      //       setPfpURL(x);
      //     });
      //   }
      };

      if (url == undefined || pfp === '') {
        func();
      }
    }, [])
;

  const [tempNumLikes, setTempNumLikes] = useState(numLikes);
  
  GetUserLikedPosts();
  const liked = userLikedPostsList.includes(postID);

  // deep copy userLikedPostsList to not alter original list
  let tempPostIDsList = [];
  for (let i = 0; i < userLikedPostsList.length; i++) {
    tempPostIDsList[i] = userLikedPostsList[i];
  }

  const [isLiked, setIsLiked] = useState(liked);

  // update firebase user-info db list of liked postIDs
  const UpdateFirebaseLikedPostsList = async (tempPostIDsList) => {
    const querySnapshot = await getDocs(collection(db, "userinfo"));
      let documentID, profilepic, favourites;
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().email === authentication.currentUser?.email)
        ) {
          documentID = doc.id;
          profilepic = doc.data().profilepic;
          favourites = doc.data().favourites;
        }
      });
    
      const editedDoc = doc(db, "userinfo", documentID);
      await setDoc(editedDoc, {
        email: authentication.currentUser?.email,
        username: userUsername,
        profilepic,
        favourites,
        likedPosts: tempPostIDsList
      });
  }

  // update firebase stories db number of likes
  const UpdateFirebaseNumLikes = async (tempNumLikes) => {
    const editedDoc = doc(db, "stories", postID);
    await setDoc(editedDoc, {
      date,
      edited,
      email,
      hour,
      minutes,
      postImage,
      postText,
      userName,
      numLikes: tempNumLikes
    });
  }

  const UpdateLikedPostsList = () => {
    setIsLiked(!isLiked);
    if (!isLiked === false) {
      if (tempPostIDsList.includes(postID)) {
        // if post already previously liked, but now no, remove post from liked list
        tempPostIDsList = tempPostIDsList.filter(id => id !== postID);
      }
      if (liked === true){
        // decrease number of likes by 1
        setTempNumLikes(tempNumLikes - 1);
      }
    } else if (!isLiked === true) {
      if (!tempPostIDsList.includes(postID)) {
        // add post to liked list
        tempPostIDsList.push(postID);
      }
      if (liked === false) {
        // increase number of likes by 1
        setTempNumLikes(tempNumLikes + 1);
      }
    }
    //update firebase db
    UpdateFirebaseLikedPostsList(tempPostIDsList);
    console.log('over here', tempNumLikes);
    UpdateFirebaseNumLikes(tempNumLikes);
  }

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
          <Avatar.Image
              backgroundColor="white"
              source={require("../../../../../assets/default_profilepic.png")}
              size={45}
            />
          {/* {pfp === "default" && (
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
          )} */}
          <Spacer size='large' position='right' />
          <UserDetailsText style={{paddingTop: 5}}>{userName}</UserDetailsText>
        </UserDetails>
        <Spacer size='medium' />
      </View>
      <View>
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
            <Text style={{fontSize: 15}}>{postText}</Text>
          </PostDetails>
        )}
      </View>
      <CountsContainer>
        {tempNumLikes != 1 && (
          <LikesCommentsCount>{tempNumLikes} Likes</LikesCommentsCount>
        )}
        {tempNumLikes == 1 && (
          <LikesCommentsCount>{tempNumLikes} Like</LikesCommentsCount>
        )}
        <Spacer size='large' position='right' />
        <LikesCommentsCount>10 Comments</LikesCommentsCount>
      </CountsContainer>
      <PostDetails>
        <BottomContainer>  
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={UpdateLikedPostsList}
          >
            <Spacer size='xLarge' position='right' />
            {isLiked === true && (
              <Icon
                raised
                name="thumb-up"
                size={24}
                color="#777"
              />
            )}
            {isLiked === false && (
              <Icon
                raised
                name="thumb-up-outline"
                size={24}
                color="#777"
              />
            )}
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
    