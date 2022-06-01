import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import { AccountNavigator } from "./account.navigation";
// import { AppNavigator } from "./app.navigation";
import { AccountScreen } from "../../features/account/account.screen";
import { LoginScreen } from "../../features/account/login.screen";
import { RegisterScreen } from "../../features/account/register.screen";
import { Mainpage } from "../../features/mainpage/mainpage";
import { AppNavigator } from "./app.navigation";
import { Profile } from "../../features/profile/profile";
import { FavouritesPage } from "../../features/profile/favourites";

export const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    // <NavigationContainer>
    //   <AccountNavigator />
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Homepage" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
