import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'

const CardSlider = ({ title, data, navigation }) => {

    const handleProdctDetails = (item) => {
        navigation.navigate('ProductDetails', { item: item })
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardTitle}>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>{title}</Text>
            </View>
            <View>
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.foodContainer} onPress={() =>handleProdctDetails(item)}>
                                <Image style={styles.foodImage} source={{ uri: item.foodImageUrl }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal:10 }}>
                                    <View style={styles.foodDescName}>
                                        <Text numberOfLines={2} ellipsizeMode='tail'  >{item.foodDescription}</Text>
                                        <Text>{item.foodName}</Text>
                                    </View>
                                    <View style={styles.foodTypePrice}>
                                        <Text style={styles.foodPrice}>₹{item.foodPrice}</Text>
                                        {
                                            item.foodType === 'veg' ?
                                                <View style={styles.veg}></View>
                                                :
                                                <View style={styles.nonVeg}></View>
                                        }
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}><Text style={{color:'white',fontSize:20}}>Buy</Text></View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    cardContainer: {
        padding: 5,
        width: '100%',
        height: 'auto',
        marginTop: 20,
        marginBottom: 20
    },
    cardTitle: {
        padding: 6,
        fontSize: 18,
        marginTop: 10
    },
    foodContainer: {
        width: 300,
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5

    },
    foodImage: {
        width: '100%',
        height: 150,
        marginRight: 10
    },
    foodDescName: {
        width: 150,
    },
    foodTypePrice: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    foodPrice: {
        fontWeight: 'bold',
        fontSize: 20
    },
    veg: {
        height: 20,
        width: 20,
        borderRadius: 5,
        backgroundColor: 'green',
    },
    nonVeg: {
        height: 20,
        width: 20,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    buttonContainer: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#FF4143'
    }
})