import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/account.screen";
import { ForgetPasswordPage } from "../../features/account/forgot-password.screen";
import { LoginScreen } from "../../features/account/login.screen";
import { RegisterScreen } from "../../features/account/register.screen";
import { AppNavigator } from "./app.navigation";

export const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Homepage" component={AppNavigator} />
        <Stack.Screen name="ForgotPassword" component={ForgetPasswordPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
