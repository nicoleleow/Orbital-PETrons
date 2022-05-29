import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";
import { signOut } from "firebase/auth";

import { AuthButton } from "../account/account.style";
import { authentication } from "../../../firebase/firebase-config";
import { Spacer } from "../../components/spacer/spacer.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const MainPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[5]};
  padding-left: ${(props) => props.theme.space[6]};
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const ProfileContainer = styled.View`
  // background-color: rgba(255, 255, 255, 0.7);
  background-color: orange
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const Profile = ({ navigation }) => {
  const Logout = () => {
    signOut(authentication)
      .then(() => {
        navigation.navigate("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeArea>
      <View>
        <MainPageHeader>PROFILE</MainPageHeader>
        <ProfileContainer>
          <AuthButton mode="contained" icon="account-check">
            Edit Profile
          </AuthButton>
          <Spacer size="large">
            <AuthButton mode="contained" icon="tag-heart">
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
