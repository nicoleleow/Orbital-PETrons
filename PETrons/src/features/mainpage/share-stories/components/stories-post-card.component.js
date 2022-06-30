import React, {useState, useEffect} from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { Text, View, Image } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from "react-native-paper";

import {
  PostCard,
  UserDetails,
  PostDetails,
  Months,
  UserDetailsText
} from "./stories-post-card.styles";

export const StoriesPostCard = ({ storyDetails }) => {
  const { date, hour, minutes, postImage, postText, userName } = storyDetails;

  const [url, setUrl] = useState();
  useEffect(() => {
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
    };

      if (url == undefined) {
      func();
      }
  }, []);
  
  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';

  const formattedDateWhole = new Date(date.seconds * 1000 + 28800 * 1000)
  const day = formattedDateWhole.getDate().toString();
  const month = Months[formattedDateWhole.getMonth()];
  const year = formattedDateWhole.getFullYear().toString();
  const formattedDate = day + ' ' + month + ' ' + year;

  const timeOfDay = hour > 12 ? 'PM' : 'AM'
  const timeTwelveHour = hour > 12 ? hour - 12 : (hour === 0) ? hour + 12 : hour
  const formattedHour = timeTwelveHour < 10 ? '0' + timeTwelveHour.toString() : timeTwelveHour;
  const formattedMinutes = (minutes < 10) ? ('0' + minutes.toString()) : minutes.toString();
  const formattedTime = formattedHour + ':' + formattedMinutes + ' ' + timeOfDay;
  

  return (
    <PostCard elevation={5}>
      <View>
        <Spacer size='xLarge' />
        <UserDetails>
          <Avatar.Image size={40} source={{ uri: pfp }} color="green" />
          <Spacer size='large' position='right' />
          <UserDetailsText>{userName}</UserDetailsText>
        </UserDetails>
        <Spacer size='medium' />
        <UserDetails>
          <UserDetailsText>{formattedDate}</UserDetailsText>
          <Spacer size='large' position='right' />
          <UserDetailsText>{formattedTime}</UserDetailsText>
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
        <View style={{ flexDirection: 'row', borderTopColor: '#777', borderTopWidth: 1.5, justifyContent:'space-evenly' }}>  
          <View style={{flexDirection: 'row'}}>
            <Icon
                raised
                name="thumb-up-outline"
                size={24} color={'#777'}
                onPress={() => console.log('camera icon pressed')}
            />
            <Spacer size='medium' position='right' />
            <Text>Like</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
                raised
                name="comment-outline"
                size={24} color={'#777'}
                onPress={() => console.log('camera icon pressed')}
            />
            <Text>Comment</Text>
          </View>
          </View>
      </PostDetails> 
    
    </PostCard>
  )
}
    