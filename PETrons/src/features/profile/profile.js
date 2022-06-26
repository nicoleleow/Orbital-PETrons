import React from "react";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { signOut } from "firebase/auth";

import { AuthButton } from "../account/account.style";
import { authentication, db } from "../../../firebase/firebase-config";
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

  return (
    <SafeArea>
      <View>
        <Text variant="header">PROFILE</Text>
        <ProfileContainer>
          <AuthButton mode="contained" icon="account-check">
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
