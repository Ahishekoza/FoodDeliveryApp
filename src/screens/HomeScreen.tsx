import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import { ArrowRightIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import OfferSlider from '../components/OfferSlider'
import firestore from '@react-native-firebase/firestore'
import CardSlider from '../components/CardSlider'
import Footer from '../components/Footer'
const HomeScreen = ({ navigation }) => {

  const [foodData, setFoodData] = useState([])
  const [vegFood, setVegFood] = useState([])
  const [nonVegFood, setNonVegFood] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e)
  }

  const foodRef = firestore().collection('FoodDataCollection')

  useEffect(() => {
    foodRef.onSnapshot(snapShot => {
      const foodDataFetched = snapShot.docs.map(doc => doc.data())
      setFoodData(foodDataFetched)
    })

  }, [])

  useEffect(() => {
    setVegFood(foodData.filter(food => food.foodType === 'veg'))
    setNonVegFood(foodData.filter(food => food.foodType === 'non-veg'))
  }, [foodData])

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />

      <View style={styles.footerContainer}>
        <Footer navigation={navigation}/>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon style={{ marginHorizontal: 5 }} size={24} color={'#FF4143'} />
          <TextInput onChangeText={handleSearch} style={styles.searchText} placeholder='Search' />
        </View>
        {
          search !== '' &&
          <View style={styles.searchedItems}>
            {
              foodData
                .filter((food) => food.foodName.toLowerCase().includes(search.toLowerCase()))
                .map((item, index) => {
                  return (
                    // --TODO if some clicks he can find the searched item in detail
                    <TouchableOpacity key={item.id} style={styles.searchedList}>
                      <ArrowRightIcon color={'#FF4143'} size={20} />
                      <Text style={styles.searchedName}>{item.foodName}</Text>
                    </TouchableOpacity>
                  )
                })
            }
          </View>
        }

        {/*  */}
        <Categories />
        <OfferSlider />
        {/*  */}
        <CardSlider title={"Today's Special"} data={foodData} navigation={navigation} />
        <CardSlider title={"Veg Menu"} data={vegFood} navigation={navigation} />
        <CardSlider title={"NonVeg Menu"} data={nonVegFood} navigation={navigation} />
      </ScrollView >
    </View >
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 20,
    marginVertical: 20,
    elevation: 10,
  },

  searchText: {
    marginHorizontal: 10,
    fontSize: 17
  },
  searchedItems: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    elevation: 20,
  },
  searchedList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    columnGap: 20
  },
  searchedName: {
    fontSize: 20,
  },
  footerContainer:{
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    width:'100%'
  }
 
})