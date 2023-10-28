import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ArrowUturnLeftIcon } from 'react-native-heroicons/outline'
import { useCart } from '../context/CartContext'
import { colors, hr80, btn1 } from '../globals/Style'
import { useAuth } from '../context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'

const PlaceOrder = ({ navigation, route }) => {

  const { totalCost } = route.params
  const [cartItems, setCartItems] = useCart()
  const [loggedInUser, setLoggedInUser] = useAuth()
  const [currentUser, setCurrentUser] = useState(
    {
      email: '',
      phoneNumber: '',
      address: '',
    }
  )

  // --Payment Method
  const handlePayement = () => {
    const paymentRef = firebase.firestore().collection('PaymentCart').doc(new Date().getTime().toString())

    paymentRef.set({
      orderId: paymentRef.id,
      orderData: cartItems,
      orderStatus: 'pending',
      orderCost: totalCost,
      orderDate: firebase.firestore.FieldValue.serverTimestamp(),
      orderName: currentUser.email,
      orderAddress: currentUser.address,
      orderPhone: currentUser.phoneNumber,
      orderUserId: loggedInUser.uid,
      orderPayment: 'online',
      paymentTotal: totalCost,
      deliveryboy_name:'',
      deliveryboy_phone:''
    })

    alert('Payment completed successfully')
    setTimeout(() => {
      deleteAllCartItems()
      navigation.navigate('Home')
    }, 2000)
  }

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

  const deleteAllCartItems = () => {
    const deletAllRef = firebase.firestore().collection('UsersCart').doc(loggedInUser.uid)

    deletAllRef.delete().then(()=>{
      console.log('deleteAllCartItems')
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [])


  return (
    <ScrollView style={styles.containerout}>
      <TouchableOpacity style={{ position: 'absolute', left: 0, zIndex: 2 }} onPress={() => navigation.navigate('Home')}>
        <View style={styles.backButton}>
          <ArrowUturnLeftIcon size={20} color={'white'} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>

        <Text style={styles.head1}>Your Order Summary</Text>
        <FlatList style={styles.c1} data={cartItems} renderItem={
          ({ item, index }) => {
            return (
              <View key={item.id} style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.Extra.quantity}</Text>
                    <Text style={styles.title}>{item.foodName}</Text>
                    <Text style={styles.price1}>₹{item.foodPrice}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalprice}>₹{parseInt(item.Extra.quantity) * parseInt(item.foodPrice)}</Text>
                  </View>
                </View>

                {item.Extra.addOnQuantity !== '0'
                  ?
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{item.Extra.addOnQuantity}</Text>
                      <Text style={styles.title}>{item.foodAddon}</Text>
                      <Text style={styles.price1}>₹{item.foodAddonPrice}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalprice}>₹{parseInt(item.Extra.addOnQuantity) * parseInt(item.foodAddonPrice)}</Text>
                    </View>
                  </View>
                  :
                  <View style={{ backgroundColor: '#FF4143', padding: 5, borderRadius: 10 }}><Text style={{ fontSize: 17, color: 'yellow', textAlign: 'center' }}>No Add On Avaliable</Text></View>
                }
              </View>
            )
          }
        } />
        <View style={hr80}>

        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
            <Text style={styles.totalprice}>{totalCost}</Text>
          </View>
        </View>

        <View style={hr80}>
        </View>

        <View style={styles.userdataout}>
          <Text style={styles.head1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{currentUser.email}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>PhoneNo:</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.title}>{currentUser.phoneNumber}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{currentUser.address}</Text>
            </View>
          </View>
        </View>

        <View style={hr80}></View>

        <View >
          <TouchableOpacity style={btn1}>
            <Text style={styles.btntext} onPress={handlePayement}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default PlaceOrder

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

  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  head1: {
    fontSize: 30,
    fontWeight: '200',
    color: colors.text1,
    margin: 10,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },

  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
  },
  price1: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text1,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'row',
  },
  totalprice: {
    fontSize: 17,
    fontWeight: 'bold',
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  btntext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.col1,
    margin: 10,
  }
})