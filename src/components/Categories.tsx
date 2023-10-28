import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { FireIcon } from 'react-native-heroicons/outline'

const Categories = () => {
    return (
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Categories</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.categoryBox}>
                    <FireIcon size={25} color={'black'} />
                    <Text>Starters</Text>
                </View>
                <View style={styles.categoryBox}>
                    <FireIcon size={25} color={'black'} />
                    <Text>Breakfast</Text>
                </View>
                <View style={styles.categoryBox}>
                    <FireIcon size={25} color={'black'} />
                    <Text>Lunch</Text>
                </View>
                <View style={styles.categoryBox}>
                    <FireIcon size={25} color={'black'} />
                    <Text>Dinner</Text>
                </View>
                <View style={styles.categoryBox}>
                    <FireIcon size={25} color={'black'} />
                    <Text>Deserts</Text>
                </View>

            </ScrollView>

        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: 'white',
        width: '90%',

        // height: 100,
        // alignItems: 'center',
        elevation: 10,
        borderRadius: 10,
        padding:10
    },
    categoryText: {
        fontSize: 25,
        fontWeight: '300',
        margin: 10,
        alignSelf: 'center',
        color: '#FF4143',
        borderBottomColor: '#FF4143',
        borderBottomWidth: 1,
    },
    categoryBox: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 5,
        width: 80,
        padding: 6,
        margin: 10,
        borderRadius: 10,
    }
    ,
})