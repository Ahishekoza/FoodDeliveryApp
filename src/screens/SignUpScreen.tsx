import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, FaceSmileIcon, GlobeAsiaAustraliaIcon, DevicePhoneMobileIcon, ViewColumnsIcon } from 'react-native-heroicons/outline'
import { firebase } from '../Firebase/FirebaseConfig'
import { isValidEmail } from '../Helper'



const SignUpScreen = ({ navigation }) => {

  // Focus Managing State
  const [emailFocus, setemailFocus] = useState(false)
  const [passwordFocus, setpasswordFocus] = useState(false)
  const [passwordConfirm, setpasswordConfirm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmShowPassword] = useState(false)
  const [phoneNumberFocus, setphoneNumberFocus] = useState(false)


  // Value Managing State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  // Error And Success Managing State
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleRegister = async () => {
    setErrorMessage('')

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    if (email.length === 0 || password.length === 0 || confirmPassword.length === 0 || phoneNumber.length === 0) {
      setErrorMessage('Please fill in all fields')
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setErrorMessage('Password must be between 8 and 16 characters');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(async (userCredential) => {
      if (userCredential.user?.uid !== null || userCredential.user?.uid !== '') {
        const userRecord = firebase.firestore().collection('UserData')
        userRecord.add({
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          address: address,
          uid:userCredential.user?.uid,
        })
          .then(() => {
            setSuccessMessage('Account created successfully')
            setTimeout(() => {
              setSuccessMessage('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
              setPhoneNumber('')
              setAddress('')
              navigation.navigate('Login')
            }, 2000)

          })
          .catch((error) => {
            setErrorMessage(error.message)
          })
      }
    }).catch((error) => {
      setErrorMessage(error.message)

    })

  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpHeading}>Sign Up</Text>
        {/* email TextInput */}
        <View style={styles.inputContainer}>
          <UserIcon size={25} color={emailFocus ? '#FF4143' : 'black'} />
          <TextInput style={styles.inputText} placeholder='Email'
            value={email}
            onChangeText={(text) => { setEmail(text) }}
            onFocus={() => {
              setemailFocus(true)
              setpasswordFocus(false)
              setpasswordConfirm(false)
              setphoneNumberFocus(false)
              setErrorMessage('')

            }} />
        </View>
        {/* phoneNumber TextInput */}
        <View style={styles.inputContainer}>
          <DevicePhoneMobileIcon size={25} color={phoneNumberFocus ? '#FF4143' : 'black'} />
          <TextInput style={styles.inputText} placeholder='Phone Number'
            value={phoneNumber}
            onChangeText={(text) => { setPhoneNumber(text) }}
            onFocus={() => {
              setphoneNumberFocus(true)
              setemailFocus(false)
              setpasswordFocus(false)
              setpasswordConfirm(false)
              setErrorMessage('')
            }} />
        </View>
        {/* password TextInput */}
        <View style={styles.inputContainer}>
          <LockClosedIcon size={25} color={passwordFocus ? '#FF4143' : 'black'} />
          <TextInput secureTextEntry={showPassword ? false : true} style={styles.inputText} placeholder='Password'
            value={password}
            onChangeText={(text) => { setPassword(text) }}
            onFocus={() => {
              setpasswordFocus(true)
              setemailFocus(false)
              setpasswordConfirm(false)
              setphoneNumberFocus(false)
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

        <View style={styles.inputContainer}>
          <LockClosedIcon size={25} color={passwordConfirm ? '#FF4143' : 'black'} />
          <TextInput secureTextEntry={showConfirmPassword ? false : true} style={styles.inputText} placeholder='Confirm Password'
            value={confirmPassword}
            onChangeText={(text) => { setConfirmPassword(text) }}
            onFocus={() => {
              setpasswordConfirm(true)
              setpasswordFocus(false)
              setemailFocus(false)
              setphoneNumberFocus(false)
              setErrorMessage('')
            }} />

          {
            showConfirmPassword ?
              <TouchableOpacity onPress={() => setConfirmShowPassword(false)}>
                <EyeIcon size={25} color={'black'} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setConfirmShowPassword(true)}>
                <EyeSlashIcon size={25} color={'black'} />
              </TouchableOpacity>
          }

        </View>


        <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 600 }}>Please Enter your Address</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Address' style={styles.inputText}
            value={address}
            onChangeText={(text) => setAddress(text)}
            onFocus={() => {
              setpasswordFocus(false)
              setpasswordConfirm(false)
              setemailFocus(false)
              setphoneNumberFocus(false)
              setErrorMessage('')
            }}
          ></TextInput>
        </View>

        {/* Displaying Error Messages */}
        {
          errorMessage &&
          <View style={styles.errorMessageBox}>
            <Text style={styles.errorMessageText}>{errorMessage}</Text>
          </View>
        }

        {/* Displaying Success Message */}

        {
          successMessage &&
          <View style={styles.successMessageBox}>
            <Text style={styles.successMessageText}>{successMessage}</Text>
          </View>
        }


        {/* Sign In Button */}
        <TouchableOpacity onPress={handleRegister} style={styles.signInButton}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }} >Register</Text>
        </TouchableOpacity>

        {/*  */}

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
          <TouchableOpacity onPress={() => navigation.navigate('Login')} >
            <Text>
              Already have account?
              <Text style={styles.signUpLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>

  )
}

export default SignUpScreen

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
  successMessageBox: {
    borderColor: 'green',
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
    padding: 10,
  },
  successMessageText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 15,
  },
})