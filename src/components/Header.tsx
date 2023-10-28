import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Bars3Icon, UserCircleIcon } from 'react-native-heroicons/outline'

const Header = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>
            <Bars3Icon size={20} color={'#FF4143'} />
            <Text style={styles.headerTitle}>Foodie</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                <UserCircleIcon size={26} color={'#FF4143'} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width:'100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'white',
        elevation: 10
    },
    headerTitle:{
        fontSize:24,
        color:'black',
    }
})