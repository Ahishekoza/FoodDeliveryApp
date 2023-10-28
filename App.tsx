/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/screens/UserProfile';
import ProductScreen from './src/screens/ProductScreen';
import Cart from './src/screens/Cart';
import PlaceOrder from './src/screens/PlaceOrder';
import TrackOrder from './src/screens/TrackOrder';

const Stack = createNativeStackNavigator();


function App() {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name= 'Login' component={SignInScreen}/>
          <Stack.Screen name='SignUp' component={SignUpScreen}/>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Profile' component={UserProfile} />
          <Stack.Screen name='ProductDetails' component={ProductScreen}/>
          <Stack.Screen name='Cart' component={Cart} />
          <Stack.Screen name='PlaceOrder' component={PlaceOrder}/>
          <Stack.Screen name='TrackOrder' component={TrackOrder}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
    //  <WelcomeScreen/>
  );
}


export default App;
