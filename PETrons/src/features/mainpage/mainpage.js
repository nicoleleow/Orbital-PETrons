import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styled from "styled-components/native";

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

export const MainPageContainer = styled.View`
  background-color: orange
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

// export const Mainpage = () => (
//   <SafeArea>
//     <View>
//       <MainPageHeader>HOME</MainPageHeader>
//     </View>
//   </SafeArea>
//   //  return (
//   //   <SafeArea>
//   //     <View>
//   //       <ProfilePageHeader>PROFILE</ProfilePageHeader>
//   //       <ProfileContainer>
//   //         <AuthButton mode="contained" icon="account-check">
//   //           Edit Profile
//   //         </AuthButton>
//   //         <Spacer size="large">
//   //           <AuthButton
//   //             mode="contained"
//   //             icon="tag-heart"
//   //             onPress={FavouritesPage}
//   //           >
//   //             Favourites
//   //           </AuthButton>
//   //         </Spacer>
//   //         <Spacer size="large">
//   //           <AuthButton mode="contained" icon="logout" onPress={Logout}>
//   //             Log Out
//   //           </AuthButton>
//   //         </Spacer>
//   //       </ProfileContainer>
//   //     </View>
//   //   </SafeArea>
//   // );
// );

export const Mainpage = ({ navigation }) => {
  const AdoptPage = () => {
    navigation.navigate("Adopt");
  };
  const PutUpAdoptionPage = () => {
    navigation.navigate("PutUpAdoption");
  };

  return (
    <SafeArea>
      <View>
        <MainPageHeader>HOME</MainPageHeader>
        <MainPageContainer>
          <AuthButton
            mode="contained"
            icon="account-check"
            onPress={PutUpAdoptionPage}
          >
            Put Up Pet for Adoption
          </AuthButton>
          <Spacer size="large">
            <AuthButton mode="contained" icon="tag-heart" onPress={AdoptPage}>
              Adopt
            </AuthButton>
          </Spacer>
          <Spacer size="large">
            <AuthButton mode="contained" icon="logout">
              Share Stoies
            </AuthButton>
          </Spacer>
          <Spacer size="large">
            <AuthButton mode="contained" icon="logout">
              FAQ
            </AuthButton>
          </Spacer>
        </MainPageContainer>
      </View>
    </SafeArea>
  );
};
