import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowUturnLeftIcon,ArrowPathIcon } from 'react-native-heroicons/outline'
import { useAuth } from '../context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'

const UserProfile = ({ navigation }) => {

    const [loggedInUser, setLoggedInUser] = useAuth()
    const [currentUser, setCurrentUser] = useState(
        {
            email: '',
            phoneNumber: '',
            address: '',
        }
    )

    const getUserInfo = () => {
        firebase.firestore().collection('UserData')
            .where('uid', '==', loggedInUser.uid)
            .get()
            .then((docs) => {
                if (!docs.empty) {
                    docs.forEach((doc) => {
                        setCurrentUser(
                            {
                                ...currentUser,
                                email: doc.data().email,
                                phoneNumber: doc.data().phoneNumber,
                                address: doc.data().address
                            });

                    })
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <View style={styles.profileContainer}>
            <TouchableOpacity style={{ position: 'absolute', left: 0, }} onPress={() => navigation.navigate('Home')}>
                <View style={styles.backButton}>
                    <ArrowUturnLeftIcon size={20} color={'white'} />
                </View>
            </TouchableOpacity>

            <View style={styles.profileContainerInner}>
                <Text style={styles.profileHeading}>YOUR PROFILE</Text>
                <View style={styles.profileDetails}>
                    {
                        currentUser?.email || currentUser?.phoneNumber || currentUser?.address
                            ?
                            <>
                                <Text style={styles.profileText}>
                                    <Text style={styles.head} >Email : </Text>
                                    {currentUser.email}
                                </Text>
                                <Text style={styles.profileText}>
                                    <Text style={styles.head}>PhoneNo. </Text>
                                    {currentUser.phoneNumber}</Text>
                                <Text style={styles.profileText}>
                                    <Text style={styles.head}>Address : </Text>
                                    {currentUser.address}</Text>
                            </>
                            :
                            <View style={{alignItems:'center',justifyContent:'center'}}><ArrowPathIcon size={25}  color={'black'}/></View>
                    }
                </View>
            </View>

        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        height: '100%',
    },

    backButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#FF4143',
    },
    profileContainerInner: {
        marginVertical: 50,
        alignItems: 'center',

    },
    profileHeading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF4143',
        textAlign: 'center',
    },
    profileDetails: {
        width: '90%',
        height: 'auto',
        padding: 20,
        alignItems:'flex-start',
        borderColor: '#FF4143',
        borderWidth: 2,
        marginTop:20,
        borderRadius:10
    },
    head:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileText:{color:'black',fontSize:20}
})