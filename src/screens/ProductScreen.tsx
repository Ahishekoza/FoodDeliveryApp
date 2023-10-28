import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native'
import React from 'react'
import { ArrowUturnLeftIcon } from 'react-native-heroicons/outline'
import { Image } from 'react-native-animatable'
import { useAuth } from '../context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'

const ProductScreen = ({ navigation, route }) => {
  const { item } = route.params
  const [loggedInUser, setLoggedInUser] = useAuth()

  const [addOnQuantity, setAddOnQuantity] = React.useState('0')
  const [quantity, setQuantity] = React.useState('1')

  if (route.params === undefined) {
    navigation.navigate('Home')
  }

  const handleAddToCart = () => {
    const foodItemRef = firebase.firestore().collection('UsersCart').doc(loggedInUser.uid)

    // spreading the item and then adding two new variable to it 
    const selectedFoodItem = { ...item, Extra: { addOnQuantity: addOnQuantity, quantity: quantity } }

    foodItemRef.get()
      .then((doc) => {
        if (doc.exists) {
          foodItemRef.update({
            Cart: firebase.firestore.FieldValue.arrayUnion(selectedFoodItem)
          })
        }
        else {
          foodItemRef.set({
            Cart: [selectedFoodItem]
          })
        }
        alert('Item added to cart')
      })

  }

  const handleIncrement = (text) => {
    // console.log(typeof(parseInt(quantity).toString()))
    if (text === 'addOn') {
      const increase = (parseInt(addOnQuantity) + 1).toString()
      setAddOnQuantity(increase)
    }
    else {
      const increase = (parseInt(quantity) + 1).toString()
      setQuantity(increase)

    }

  }

  const handleDecrement = (text) => {

    if (text === 'addOn') {

      if (parseInt(addOnQuantity) === 0) {
        setAddOnQuantity('0')
        return
      }
      const decrease = (parseInt(addOnQuantity) - 1).toString()
      setAddOnQuantity(decrease)

    }
    else {
      if (parseInt(quantity) <= 1) {
        setQuantity('1')
        return
      }

      const decrease = (parseInt(quantity) - 1).toString()
      setQuantity(decrease)
    }
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity style={{ position: 'absolute', left: 0, zIndex: 2 }} onPress={() => navigation.navigate('Home')}>
        <View style={styles.backButton}>
          <ArrowUturnLeftIcon size={20} color={'white'} />
        </View>
      </TouchableOpacity>
      {/* Product Details */}
      <View style={styles.productDetailsContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.foodImageUrl }} style={styles.productImage} />
        </View>
        <View style={styles.namePriceContainer}>
          <Text style={styles.foodName}>{item.foodName}</Text>
          <Text style={{ fontSize: 34, color: 'black' }}>
            ₹{item.foodPrice}
          </Text>
        </View>

        {/* About Info */}
        <View style={styles.aboutTypeContainer}>
          <Text style={{ fontSize: 20, color: 'white' }}>About Food</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>{item.foodDescription}</Text>

          <View style={styles.foodType}>
            {
              item.foodType === 'veg' ?
                <View style={styles.veg}></View>
                :
                <View style={styles.nonVeg}></View>
            }
            <Text style={{ fontSize: 20, color: 'black' }}>{item.foodType}</Text>
          </View>

          {
            item.foodAddon !== '' ?
              <>
                <Text style={{ color: 'yellow', fontSize: 17 }}> Add On :- Avaliable</Text>
                <Text style={{ color: 'yellow', fontSize: 17 }}> {item.foodAddon}, Price per Add On ₹{item.foodAddonPrice}</Text></>
              :
              <>
                <Text style={{ color: 'yellow', fontSize: 17 }}> Add On :- Not Avaliable</Text>
              </>
          }

        </View>

        {/* Restaurant Location */}
        <View style={styles.restaurantInfoContainer}>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#FF4143', }}>Location</Text>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <View style={styles.restaurantAddress}>
            <Text style={styles.restaurantText}>{item.restrauntAddressBuilding}</Text>
            <Text style={styles.restaurantText}>{item.restrauntAddressStreet}</Text>
            <Text style={styles.restaurantText}>{item.restrauntAddressCity}</Text>
          </View>
        </View>

        {/* Increment Decrement Button / Add On */}
        <View style={item.foodAddon !== '' ? styles.quantityAddOnQuantityContainer : styles.quantityContainer}>

          <View>
            <Text style={styles.containerHeading}>Food Quantity</Text>
            <View style={styles.incrementDecrementContainer}>
              <TouchableOpacity style={styles.incDecButtons} onPress={handleIncrement}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TextInput style={styles.quantityInput} value={quantity} />
              <TouchableOpacity style={styles.incDecButtons} onPress={handleDecrement}>
                <Text style={styles.buttonText} >-</Text>
              </TouchableOpacity>
            </View>
          </View>

          {item.foodAddon !== '' && <View>
            <Text style={styles.containerHeading}>AddOn Quantity</Text>
            <View style={styles.incrementDecrementContainer}>
              <TouchableOpacity style={styles.incDecButtons} onPress={() => handleIncrement('addOn')}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TextInput style={styles.quantityInput} value={addOnQuantity} />
              <TouchableOpacity style={styles.incDecButtons} onPress={() => handleDecrement('addOn')}>
                <Text style={styles.buttonText} >-</Text>
              </TouchableOpacity>
            </View>
          </View>}
        </View>

        {/* Total Price */}

        <View style={styles.underline}></View>

        <View style={styles.totalPrice}>
          <Text style={{ fontSize: 20, color: '#FF4143' }}>
            Total Price :
          </Text>
          <Text style={{ fontSize: 30, fontWeight: 700 }}>
            ₹{(item.foodPrice * +quantity + item.foodAddonPrice * +addOnQuantity)}
          </Text>
        </View>
        <View style={styles.underline}></View>


        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonDecoration} onPress={handleAddToCart}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 600, textAlign: 'center' }} >Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDecoration}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 600, textAlign: 'center' }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
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
  productDetailsContainer: {
    width: '100%',
    height: '100%',

  },

  productImageContainer: {
    width: '100%',
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  namePriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  foodName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF4143',
    textAlign: 'center',
  },
  aboutTypeContainer: {

    width: '90%',
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    backgroundColor: '#FF4143',
    borderRadius: 20
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
  foodType: {
    width: 110,
    height: 50,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10
  },
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonDecoration: {
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FF4143',
    elevation: 10
  },
  restaurantInfoContainer: {
    backgroundColor: 'white',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 20,
    elevation: 10
  },
  restaurantName: {
    textAlign: 'center',
    marginVertical: 5,
    letterSpacing: 2,
    color: 'black',
    fontSize: 23
  },
  restaurantAddress: {
    paddingHorizontal: 5,
  },
  restaurantText: {
    fontWeight: 'bold',
    color: 'grey',
  },
  quantityAddOnQuantityContainer: {
    width: '90%',
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  quantityContainer: {
    width: '90%',
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  containerHeading: {
    fontSize: 20,
    color: '#FF4143',
  },
  incrementDecrementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
    columnGap: 5
  },
  incDecButtons: {
    width: 40,
    height: 40,
    backgroundColor: '#FF4143',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
  quantityInput: {
    backgroundColor: 'white',
    elevation: 10,
    width: 60,
    fontSize: 20,
    borderRadius: 10,
  },
  totalPrice: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10
  },
  underline: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 1,
    backgroundColor: '#FF4143',
  }


})