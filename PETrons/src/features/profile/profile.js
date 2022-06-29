import React from "react";
import { SafeAreaView, View } from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthButton } from "../account/account.style";
import {
  authentication,
  db,
  userUsername,
} from "../../../firebase/firebase-config";
import { Spacer } from "../../components/spacer/spacer.component";

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
    navigation.navigate("EditingProfile");
  };

  return (
    <SafeArea>
      <UserInfoSection>
        <Avatar.Image
          backgroundColor="black"
          source={require("../../../assets/postIt_icon.png")}
          size={90}
        />
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
              icon="tag-heart"
              onPress={PutUpAdoptionListPage}
            >
              Your Listed Adoptions
            </AuthButton>
          </Spacer>
          <Spacer size="large">
            <AuthButton mode="contained" icon="heart" onPress={FavouritesPage}>
              Favourites
            </AuthButton>
          </Spacer>
          <Spacer size="large">
            <AuthButton mode="contained" icon="logout" onPress={Logout}>
              Log Out
            </AuthButton>
          </Spacer>
        </ProfileContainer>
      </View>
    </SafeArea>
  );
};
