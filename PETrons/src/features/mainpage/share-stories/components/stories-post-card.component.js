import React, {useState, useEffect} from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { Text, View } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  PostCard,
  PostCardCover,
  PostDetails
} from "./stories-post-card.styles";

export const StoriesPostCard = () => {
   
  const [url, setUrl] = useState();
  useEffect(() => {
      const func = async () => {
      const uploadUri = image;
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
  const date = '12 October 2022'
  const story = 'I adopted my pet Dolly and she\'s such a cute cat'
  const pic = 'https://i.natgeofe.com/n/f0dccaca-174b-48a5-b944-9bcddf913645/01-cat-questions-nationalgeographic_1228126.jpg'
  
  return (
    <PostCard elevation={5}>
      <PostCardCover key={username} source={{ uri: pic }} />
      <PostDetails>
        <Text>{date}</Text>
        <Text>{story}</Text>
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
    