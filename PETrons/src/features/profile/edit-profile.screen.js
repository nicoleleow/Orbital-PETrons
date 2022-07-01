import React from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
// import { TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const PageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  margin-top: ${(props) => props.theme.space[5]};
  text-align: center;
  margin-bottom: ${(props) => props.theme.space[5]};
`;

const ProfilePicture = styled(View)`
  height: 100px;
  width: 100px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ImageText = styled(Text)`
  color: gainsboro;
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.monospace};
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  text-align: center;
  text-decoration-line: underline;
`;

const FieldInput = styled(TextInput)`
  flex-direction: row;
  margin-top: ${(props) => props.theme.space[5]};
  margin-bottom: ${(props) => props.theme.space[3]};
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
  padding-bottom: 5px;
  width: 340px;
`;

export const EditProfilePage = () => (
  <SafeArea>
    <View>
      <PageHeader>Edit Your Profile:</PageHeader>
    </View>
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity>
        <ProfilePicture>
          <ImageBackground
            source={require("../../../assets/postIt_icon.png")}
            style={{ height: 100, width: 100 }}
            imageStyle={{ borderRadius: 15 }}
            backgroundColor="black"
          ></ImageBackground>
        </ProfilePicture>
      </TouchableOpacity>
      <Pressable onPress={() => console.log("hi")}>
        <ImageText>Change profile photo</ImageText>
      </Pressable>
      <FieldInput
        placeholder="Email"
        placeholderTextColor="black"
        autoCorrect={false}
      ></FieldInput>
      <FieldInput
        placeholder="Username"
        placeholderTextColor="black"
        autoCorrect={false}
      ></FieldInput>
      <FieldInput
        placeholder="Password"
        placeholderTextColor="black"
        autoCorrect={false}
      ></FieldInput>
    </View>
  </SafeArea>
);
