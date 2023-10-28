import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { ArrowUturnLeftIcon } from 'react-native-heroicons/outline'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Image } from 'react-native-animatable'
import { TrashIcon } from 'react-native-heroicons/outline'
import { firebase } from '../Firebase/FirebaseConfig'
import { useAuth } from '../context/AuthContext'

const Cart = ({ navigation }) => {

  const [loggedInUser, setLoggedInUser] = useAuth()
  const [cartItems, setCartItems] = useCart()
  const [totalCost, setTotalCost] = useState('0')

  const handleDelete = (item) => {
    const deleteRef = firebase.firestore().collection('UsersCart').doc(loggedInUser.uid)

    deleteRef.update({
      Cart: firebase.firestore.FieldValue.arrayRemove(item)
    })
      .then((result) => {
        console.log("Item deleted successfully")
      })
      .catch((error) => {
        console.log(error.message)
      })

  }

  useEffect(() => {
    if (cartItems.length !== 0) {
      let foodPrice = 0
      cartItems.map((item) => {
        foodPrice = foodPrice + (parseInt(item.foodPrice) * parseInt(item.Extra.quantity) + parseInt(item.foodAddonPrice) * parseInt(item.Extra.addOnQuantity))
      })
      setTotalCost(foodPrice.toString())
    } else {
      setTotalCost('0')
    }

  }, [cartItems])

  return (
    <View style={styles.cartInfoContainer}>
      <TouchableOpacity style={{ position: 'absolute', left: 0, zIndex: 2 }} onPress={() => navigation.navigate('Home')}>
        <View style={styles.backButton}>
          <ArrowUturnLeftIcon size={20} color={'white'} />
        </View>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={ cartItems.length !==0 ?{ flexGrow: 1, marginHorizontal: 10 } : {flexGrow: 1, marginHorizontal: 10,justifyContent:'center',alignItems:'center'}}>

        {
          cartItems.length !== 0 ?
            cartItems.map((cartItem) => {
              return (
                <View style={styles.cartContainer} key={cartItem.id}>
                  <View>
                    <Image source={{ uri: cartItem.foodImageUrl }} style={styles.foodImage} />
                    <Text style={styles.foodName}>{cartItem.foodName}</Text>
                  </View>
                  <View style={styles.priceQuantity}>
                    <Text style={styles.quantity}>Quantity: {cartItem.Extra.quantity}</Text>
                    <Text style={styles.foodPrice}>₹{cartItem.foodPrice}/each</Text>
                    {cartItem.Extra.addOnQuantity && <Text style={styles.addOnQuantity}>AddOnQuantity: {cartItem.Extra.addOnQuantity}</Text>}
                    <TouchableOpacity style={styles.deleteContainer} onPress={() => handleDelete(cartItem)}>
                      <Text style={{ textAlign: 'center', color: 'black', fontSize: 17 }}><TrashIcon size={17} color={'#FF4143'} />Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
            :
            <View style={{ height:200,borderRadius:20,borderColor:'black',borderWidth:1,marginVertical:100,justifyContent:'center',alignItems:'center' ,width:'100%'}}>
              <Text style={{fontSize:30,color:'black'}}>Cart is Empty!</Text>
            </View>
        }
      </ScrollView>

      {/* Display the Total Price only when Items in cart is not zero */}
      {
        cartItems.length !== 0 && <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', columnGap:30, borderTopColor: '#FF4143', borderTopWidth: 1 }}>
          <Text style={{ fontSize: 20, color: '#FF4143' }}>Total Price :--</Text>
          <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>₹{totalCost}</Text>
          <TouchableOpacity style={{backgroundColor:'#FF4143',padding:10,borderRadius:10,elevation:10}} onPress={()=>navigation.navigate('PlaceOrder',{totalCost})}><Text style={{color:'white',fontSize:17,fontWeight:'bold',}}>Place Order</Text></TouchableOpacity>
        </View>
      }

    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  cartInfoContainer: {
    flex: 1,
    width: '100%',
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
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    width: '100%'
  },
  cartContainer: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    columnGap: 20

  },
  foodImage: {
    width: 140,
    height: 100,
    borderRadius: 10,
  },
  quantity:
  {
    fontSize: 22,
    marginRight: 2,
    color: '#FF4143',
    fontWeight: 'bold'
  },
  foodName:
  {
    fontSize: 23,
    color: '#FF4143',
    fontWeight: 'bold'
  },
  foodPrice: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5
  },
  priceQuantity: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%'
  },
  addOnQuantity: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  deleteContainer: { borderColor: '#FF4143', borderWidth: 2, padding: 5, marginTop: 5, borderRadius: 10 }
})