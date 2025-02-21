import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Connexion from "../screens/Connexion";
import Home from "../screens/Home"; 
import ForgotPassword from "../screens/ForgotPassword";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Connexion" component={Connexion} options={{ title: "connexion" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} /> 
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: "ForgotPassword"}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{title: "SignUp"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
