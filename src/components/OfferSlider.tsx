import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { offerSliderCarousel } from '../DataAssest'

const OfferSlider = () => {
    
    return (
        <View style={styles.offerContainer}>
            <Swiper
                autoplay={true}
                autoplayTimeout={5}
                showsButtons={true}
                dotColor='grey'
                activeDotColor='#FF4143'
                nextButton={<Text style={styles.sliderButton}>›</Text>}
                prevButton={<Text style={styles.sliderButton}>‹</Text>}
            >
                {
                    offerSliderCarousel.map((item, index) => {
                        return (
                            <View style={styles.slide} key={item.id}>
                                <Image source={item.img} style={styles.image} />
                            </View>
                        )
                    })
                }
            </Swiper>
        </View>
    )
}

export default OfferSlider

const styles = StyleSheet.create({
    offerContainer: {
        marginVertical: 20,
        width: '100%',
        height: 200,
        paddingHorizontal:10,
        
    },

    sliderButton: {
        fontSize: 40,
        backgroundColor: 'white',
        width: 40,
        height: 40,
        color: '#FF4143',
        borderRadius: 20,
        textAlign: 'center',
        lineHeight: 40,
    },

    slide: {
        width: '100%',
        height: 200,

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20

    }
})