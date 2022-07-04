import React, { useState, useEffect } from "react";
import { SafeAreaView, View, RefreshControl, ScrollView } from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";

import { AuthButton } from "../account/account.style";
import {
  authentication,
  db,
  userUsername,
  userImage,
  getUserName,
} from "../../../firebase/firebase-config";
import { Spacer } from "../../components/spacer/spacer.component";
import { MyStoryPostsPage } from "./screens/my-story-posts.screen";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

export const ProfileContainer = styled.View`
  background-color: orange
  padding: ${(props) => props.theme.space[5]};
  margin-top: ${(props) => props.theme.space[2]};
`;

const UserInfoSection = styled.View`
  padding-horizontal: 30px;
  margin-bottom: ${(props) => props.theme.space[3]};
  flex-direction: row;
  margin-top: 40px;
`;

const UsernameTitle = styled(Title)`
  font-size: 24px;
  font-weight: bold;
  margin-top: ${(props) => props.theme.space[4]};
  margin-bottom: 5px;
`;

const EmailCaption = styled(Caption)`
  font-size: 14px;
  line-height: ${(props) => props.theme.space[4]};
  font-weight: 500;
`;

export let filteredList = [];

export const ProfilePage = ({ navigation }) => {
  const Logout = () => {
    signOut(authentication)
      .then(() => {
        navigation.navigate("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FavouritesPage = () => {
    navigation.navigate("Favourites");
  };

  const PutUpAdoptionListPage = async () => {
    navigation.navigate("PutUpAdoptionList");
  };

  const EditProfilePage = async () => {
    navigation.navigate("Edit Your Profile");
  };

  const MyStoryPostsPage = async () => {
    navigation.navigate("MyStoryPostsPage");
  };

  const [url, setUrl] = useState();
  useEffect(() => {
    const func = async () => {
      if (userImage !== "default") {
        const uploadUri = userImage;
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

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    getUserName();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <UserInfoSection>
          {userImage === "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={require("../../../assets/default_profilepic.png")}
              size={90}
            />
          )}
          {userImage !== "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={{ uri: url }}
              size={90}
            />
          )}
          <View style={{ marginLeft: 15 }}>
            <UsernameTitle>{userUsername}</UsernameTitle>
            <EmailCaption>
              <Icon name="email" size={15} />
              {" " + authentication.currentUser?.email}
            </EmailCaption>
          </View>
        </UserInfoSection>
        <View>
          <ProfileContainer>
            <AuthButton
              mode="contained"
              icon="account-check"
              onPress={EditProfilePage}
            >
              Edit Profile
            </AuthButton>
            <Spacer size="large">
              <AuthButton
                mode="contained"
                icon="heart"
                onPress={FavouritesPage}
              >
                Favourites
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <AuthButton
                mode="contained"
                icon="tag-heart"
                onPress={PutUpAdoptionListPage}
              >
                My Listed Adoptions
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <AuthButton
                mode="contained"
                icon="post-outline"
                onPress={MyStoryPostsPage}
              >
                My Story Posts
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <AuthButton mode="contained" onPress={MyStoryPostsPage}>
                <Icon2 name="thumbs-up-sharp" color="white" />
                <Spacer size="medium" position="right" />
                My Liked Posts
              </AuthButton>
            </Spacer>
            <Spacer size="large">
              <AuthButton mode="contained" icon="logout" onPress={Logout}>
                Log Out
              </AuthButton>
            </Spacer>
          </ProfileContainer>
        </View>
      </ScrollView>
    </SafeArea>
  );
};
