import React, {useState, useEffect} from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { Text, View, Image } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from "react-native-paper";

import {
  PostCard,
  UserDetails,
  PostCardCover,
  PostDetails
} from "./stories-post-card.styles";

export const StoriesPostCard = ({ storyDetails }) => {
  const { date, day, month, year, postImage, postText, userName } = storyDetails;

  const [url, setUrl] = useState();
  useEffect(() => {
      const func = async () => {
      const uploadUri = postImage;
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      await getDownloadURL(reference).then((x) => {
          setUrl(x);
      });
      };

      if (url == undefined) {
      func();
      }
  }, []);

  const username = 'john doe'
  const postDate = '12 October 2022'
  const story = 'I adopted my pet Dolly and she\'s such a cute cat'
  const pic = 'https://i.natgeofe.com/n/f0dccaca-174b-48a5-b944-9bcddf913645/01-cat-questions-nationalgeographic_1228126.jpg'
  
  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';

  return (
    <PostCard elevation={5}>
      <Spacer size='xLarge' />
      <UserDetails>
        <Avatar.Image size={40} source={{ uri: pfp }} color="green" />
        <Spacer size='large' position='right' />
        <Text>{userName}</Text>
      </UserDetails>
      <Spacer size='medium' />
      <UserDetails style={{flexDirection: 'column'}}>
        <Text>{day}/{month}/{year}</Text>
      </UserDetails>
      <Spacer size='medium' />
      {postImage && (
        <Image
          source={{ uri: url }}
          style={{ resizeMode: "contain", width: 360, height: 220, alignSelf: 'center'}}
        />
      )}
      {(postText !== '') && (
        <PostDetails>
          <Text>{postText}</Text>
        </PostDetails>
      )}
      <PostDetails>
        <Spacer size='small' />
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
    