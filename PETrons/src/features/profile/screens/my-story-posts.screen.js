import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text } from "../../../components/typography/text.component";
import {
  storiesList,
  GetStoriesData,
} from "../../../../firebase/firebase-config";
import { authentication } from "../../../../firebase/firebase-config";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MyPostsCard } from "../components/my-posts-card.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

const AdoptionList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const MyStoryPostsPage = ({ navigation }) => {
  const filteredList = storiesList.filter((obj) => {
    return obj[1].email === authentication.currentUser?.email;
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    GetStoriesData();
    const newFilteredList = storiesList.filter((obj) => {
      return obj[1].email === authentication.currentUser?.email;
    });
    setFilteredStories(newFilteredList);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [filteredStories, setFilteredStories] = useState(filteredList);

  useEffect(() => {
    GetStoriesData();
  }, []);

  return (
    <SafeArea>
      <View>
        <Text variant="header">My Story Posts</Text>
      </View>

      <AdoptionList
        data={filteredStories}
        renderItem={(item) => (
          <TouchableOpacity>
            <MyPostsCard storyDetails={item.item} navigation={navigation} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item[0]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeArea>
  );
};
