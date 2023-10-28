import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {HomeIcon,MagnifyingGlassIcon,ShoppingCartIcon,MapIcon} from 'react-native-heroicons/outline'
import { useCart } from '../context/CartContext'

const Footer = ({navigation}) => {

  const [cartItems,setCartItems] = useCart()

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate('Welcome')}>
        <HomeIcon size={30} color={'#FF4143' }/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButtonContainer} onPress={()=>navigation.navigate('Home')}>
        <MagnifyingGlassIcon size={40} color={'white'}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartContainer} onPress={()=>navigation.navigate('Cart')}>
        <View style={styles.itemsInCart}>
          <Text style={{color:'white',fontWeight:'bold'}}>{cartItems.length}</Text>
        </View>
        <ShoppingCartIcon size={30} color={'#FF4143'}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('TrackOrder')}>
        <MapIcon size={30} color={'#FF4143'}/>
      </TouchableOpacity>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopColor:'#FF4143',
    borderTopWidth: 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding:5
  },
  searchButtonContainer:{
    height: 60,
    width: 60,
    backgroundColor: '#FF4143',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position:'relative',
    top: -20,
  },
  cartContainer:{
    position:'relative',
  },
  itemsInCart:{
    height:20,
    width:20,
    borderRadius: 30,
    backgroundColor:'#FF4143',
    position:'absolute',
    top:-10,
    right:-10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})