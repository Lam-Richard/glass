import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddMoment from './screens/AddMoment';

function App () {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Auth" component={SignUpScreen} />
      <Stack.Screen name="AddMoment" component={AddMoment} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;