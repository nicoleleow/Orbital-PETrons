import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { authentication } from "../../../../../firebase/firebase-config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { colors } from "../../../../infrastructure/theme/colors";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

const PasswordRequirements = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-bottom: ${(props) => props.theme.space[4]};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const FieldInput = styled(TextInput)`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[4]};
  border-bottom-width: 1px;
  border-bottom-color: black;
  padding-bottom: 5px;
  width: 300px;
`;

const ConfirmButton = styled(Button).attrs({
  color: colors.button.main,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: ${(props) => props.theme.space[5]};
`;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const ChangePasswordPage = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState("");
  const emailCred = EmailAuthProvider.credential(
    authentication.currentUser.email,
    currentPassword
  );

  const DoneAlert = async () => {
    const inputs = [currentPassword, newPassword, newRepeatedPassword];
    if (inputs.includes("") || inputs.includes(undefined)) {
      Alert.alert("Please fill in all fields");
    } else if (newPassword === currentPassword) {
      Alert.alert("Old and new password are the same!");
    } else if (newPassword.length < 6) {
      Alert.alert("Password should be at least 6 characters!");
    } else if (newPassword !== newRepeatedPassword) {
      Alert.alert("Passwords do not match!");
    } else {
      reauthenticateWithCredential(authentication.currentUser, emailCred)
        .then(() => {
          Alert.alert(
            "Confirm Password Change",
            "Are you sure you want to make the following changes?",
            [
              {
                text: "Cancel",
              },
              {
                text: "Yes",
                onPress: confirmUpdate,
              },
            ]
          );
        })
        .catch((error) => {
          if (error.message.slice(22, -2) === "wrong-password") {
            Alert.alert("Current password input is incorrect");
          } else {
            Alert.alert(error.message.slice(22, -2));
          }
          console.log(error);
        });
    }
  };

  const confirmUpdate = async () => {
    updatePassword(authentication.currentUser, newPassword)
      .then(() => {
        navigation.navigate("ProfilePage");
      })
      .catch((error) => {
        Alert.alert(error.message.slice(22, -2));
      });
  };

  return (
    <DismissKeyboard>
      <SafeArea>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <PasswordRequirements>
              Password should be at least 6 characters long.
            </PasswordRequirements>
            <FieldInput
              placeholder="Current Password"
              autoCorrect={false}
              placeholderTextColor="black"
              onChangeText={(text) => setCurrentPassword(text)}
            ></FieldInput>
            <FieldInput
              placeholder="New Password"
              autoCorrect={false}
              placeholderTextColor="black"
              onChangeText={(text) => setNewPassword(text)}
            ></FieldInput>
            <FieldInput
              placeholder="Repeat New Password"
              autoCorrect={false}
              placeholderTextColor="black"
              onChangeText={(text) => setNewRepeatedPassword(text)}
            ></FieldInput>
            <ConfirmButton
              labelStyle={{ color: colors.button.text }}
              icon="sticker-check-outline"
              mode="contained"
              onPress={DoneAlert}
            >
              <Text style={{ color: colors.button.text }}>save</Text>
            </ConfirmButton>
          </View>
        </ScrollView>
      </SafeArea>
    </DismissKeyboard>
  );
};
