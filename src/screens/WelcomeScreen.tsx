import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.jpg'
import * as Animatable from 'react-native-animatable';
import { firebase } from '../Firebase/FirebaseConfig'
import { useAuth } from '../context/AuthContext';
const WelcomeScreen = ({ navigation }) => {

  const [userLoggedIn, setUserLoggedIn] = useAuth()

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUserLoggedIn(null)
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Welcome to Foodie</Text>
        <Animatable.View animation={'fadeInLeftBig'} duration={2000}>
          <Image source={logo} style={styles.logoHeight} />
        </Animatable.View>
        <View style={styles.underline}></View>
        <View><Text style={styles.subheading}>Find the best food around you at lowest price</Text></View>
        <View style={styles.underline}></View>


        {
          userLoggedIn !== null ?

            <>
              <Text style={styles.LoggedUser}>
                <Text>Signed In As : - </Text>
                {userLoggedIn.email}
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text style={styles.button}>Go To Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} ><Text style={styles.button}>Logout</Text></TouchableOpacity>
              </View>
            </> :
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.button}>SignUp</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} ><Text style={styles.button}>Login</Text></TouchableOpacity>
            </View>
        }
      </View>
    </ScrollView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4143'
  },
  headerTitle: {
    fontSize: 35,
    width: 200,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10
  },
  logoHeight: {
    height: 300,
    width: 300,
    borderRadius: 10,
    marginBottom: 10
  },
  underline: {
    width: 300,
    height: 1,
    backgroundColor: 'white'
  },
  subheading: {
    fontSize: 20,
    width: 300,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    columnGap: 40,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    color: '#FF4143',
    fontWeight: 'bold',
  },
  LoggedUser:{
    fontSize:17,
    marginTop:20,
    color:'white',
    fontWeight:'bold',
  }

})