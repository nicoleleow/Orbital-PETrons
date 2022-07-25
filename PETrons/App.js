import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Platform,
  LogBox,
} from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";

import { Mainpage } from "./src/features/mainpage/mainpage.screen";
import { theme } from "./src/infrastructure/theme";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigation";
import { Navigation } from "./src/infrastructure/navigation";

import { StoriesPage } from "./src/features/mainpage/share-stories/share-stories.screen";
import { CreatePostScreen } from "./src/features/mainpage/share-stories/screens/create-post.screen";

// ignore warnings
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
