import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, FaceSmileIcon, GlobeAsiaAustraliaIcon } from 'react-native-heroicons/outline'
import { firebase } from '../Firebase/FirebaseConfig'
import { isValidEmail } from '../Helper'

const SignInScreen = ({ navigation }) => {

  // 
  const [emailFocus, setemailFocus] = useState(false)
  const [passwordFocus, setpasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Value Managing state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin =()=>{

    
    if(email.length === 0 || password.length === 0){
      setErrorMessage('Please enter all required fields')
      return;
    }
    if(!isValidEmail(email)){
      setErrorMessage('Please enter a valid email address')
      return;
    }
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredentials)=>{
      navigation.navigate('Welcome')
      
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpHeading}>Sign In</Text>
        {/* email TextInput */}
        <View style={styles.inputContainer}>
          <UserIcon size={25} color={emailFocus ? '#FF4143' : 'black'} />
          <TextInput style={styles.inputText} placeholder='Email'
            value={email}
            onChangeText={(text) => {
              setEmail(text)
            }}
            onFocus={() => {
              setemailFocus(true)
              setpasswordFocus(false)
              setErrorMessage('')
            }} />
        </View>
        {/* password TextInput */}
        <View style={styles.inputContainer}>
          <LockClosedIcon size={25} color={passwordFocus ? '#FF4143' : 'black'} />
          <TextInput secureTextEntry={showPassword ? false : true} style={styles.inputText} placeholder='Password'
            value={password}
            onChangeText={(text) => {
              setPassword(text)
            }}
            onFocus={() => {
              setpasswordFocus(true)
              setemailFocus(false)
              setErrorMessage('')
            }} />

          {
            showPassword ?
              <TouchableOpacity onPress={() => setShowPassword(false)}>
                <EyeIcon size={25} color={'black'} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setShowPassword(true)}>
                <EyeSlashIcon size={25} color={'black'} />
              </TouchableOpacity>
          }

        </View>

        {
          errorMessage &&
          <View style={styles.errorMessageBox}>
            <Text style={styles.errorMessageText}>{errorMessage}</Text>
          </View>
        }

        {/* Sign In Button */}
        <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>

        {/*  */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.or}>OR</Text>
        <Text style={styles.signInGF}>Sign In With</Text>

        <View style={styles.socialMediaLogin}>
          {/* google */}
          <TouchableOpacity style={styles.socialMediaIcons}>
            <GlobeAsiaAustraliaIcon size={35} color={'red'} />
          </TouchableOpacity>
          {/* facebook */}
          <TouchableOpacity style={styles.socialMediaIcons}>
            <FaceSmileIcon size={35} color={'blue'} />
          </TouchableOpacity>
        </View>

        {/*  */}
        <View style={styles.horizontalLine}></View>
        <View >
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
            <Text>
              Don't have an account?
              <Text style={styles.signUpLink}>SignUp</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>

  )
}

export default SignInScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,

  },
  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpHeading: {
    fontSize: 25,
    color: '#FF4143'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    paddingLeft: 5,
    elevation: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  inputText: {
    padding: 10,
    fontSize: 15,
    width: '80%',
    color: 'black'
  },
  errorMessageBox: {
    borderColor: '#FF4143',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
    padding: 10,
    borderStyle: 'solid',
  },
  errorMessageText: {
    color: '#FF4143',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signInButton: {
    marginTop: 10,
    backgroundColor: '#FF4143',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    width: '80%',
  },
  forgotPassword: {
    marginVertical: 10,
    color: 'darkgray',
    fontSize: 15
  },
  or: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF4143',
  },
  signInGF: {
    marginVertical: 10,
    fontSize: 20
  },
  socialMediaLogin: {
    marginVertical: 20,
    flexDirection: 'row',
    columnGap: 20,
  },
  socialMediaIcons: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  horizontalLine: {
    width: '80%',
    height: 1,
    marginVertical: 10,
    backgroundColor: '#E0E0E0',
  },
  signUpLink: {
    color: '#FF4143',

  }
})