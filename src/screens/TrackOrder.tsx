import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'
import { ArrowUturnLeftIcon } from 'react-native-heroicons/outline'
import Footer from '../components/Footer'
import * as Animatable from 'react-native-animatable';

const TrackOrder = ({ navigation }) => {

  const [loggedInUser, setLoggedInUser] = useAuth()
  const [orderedItems, setOrderedItems] = useState([])
  const getAllOrders = () => {
    const docRef = firebase.firestore().collection('PaymentCart').where('orderUserId', '==', loggedInUser.uid)
    docRef.onSnapshot(snapshot => {
      setOrderedItems(snapshot.docs.map(doc => doc.data()))
    })
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  const convertDate = (date) => {
    // console.log(date.seconds)
    const newdate = new Date(date.seconds * 1000)
    // console.log(newdate)
    return newdate.toDateString()
  }

  return (
    <View style={styles.trackOrderContainer}>
      <TouchableOpacity style={{ position: 'absolute', left: 0, zIndex: 2 }} onPress={() => navigation.navigate('Home')}>
        <View style={styles.backButton}>
          <ArrowUturnLeftIcon size={20} color={'white'} />
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={{ width: '90%' }}>
          <Text style={{ fontSize: 30, letterSpacing: 5, color: '#FF4143', textAlign: 'center' }}>Track Orders</Text>
          <View>
            {
              orderedItems.map((order, index) => {
                return (
                  <View key={index} style={{ backgroundColor: 'white', elevation: 10, width: '100%', padding: 10, borderRadius: 10, marginVertical: 10 }}>

                    <View style={{ flexDirection: 'row', columnGap: 30 }}>
                      <Text style={{ backgroundColor: '#FF4143', color: 'white', padding: 10, borderRadius: 10, fontSize: 20, height: 50 }}>{index + 1}</Text>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Order Id : {order.orderId}</Text>
                        <Text style={{ fontSize: 20, color: 'black' }}>Order Date : {convertDate(order.orderDate)}</Text>
                      </View>
                    </View>

                    {
                      order.orderStatus === 'delivered' &&
                      <View style={{ width: '90%', elevation: 10, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', marginVertical: 20, backgroundColor: 'green', padding: 10, borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 20 }}>Your Ordered Is Delivered</Text></View>
                    }
                    {
                      order.orderStatus === 'ontheway' &&
                      <View style={{ width: '90%', elevation: 10, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', marginVertical: 20, backgroundColor: '#E9AA13', padding: 10, borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 20 }}>Your Order Is On The Way</Text></View>
                    }
                    {
                      order.orderStatus === 'cancelled' &&
                      <View style={{ width: '90%', elevation: 10, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', marginVertical: 20, backgroundColor: 'red', padding: 10, borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 20 }}>Your Order Has Been Cancelled</Text></View>
                    }
                    
                    {/* Delivery Details */}
                    <View style={{ backgroundColor: 'white', elevation: 20, width: '90%', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto',marginVertical:10, padding: 10, borderRadius: 10, overflow: 'hidden' }}>
                      <Text style={{ textAlign: 'center', fontSize: 20, letterSpacing: 1, color: '#FF4143' }}>Delivery Person Name & PhoneNo.</Text>
                      {order.deliveryboy_name !== ''
                        ?
                        <Text style={{ marginVertical: 5, fontSize: 17, color: 'black' }}>Name: {order.deliveryboy_name}</Text>
                        :
                        <Animatable.Text style={{ marginVertical: 5, fontSize: 17, color: 'black' }} animation={'fadeInLeftBig'} duration={2000}>Delivery Details Not Alloted Yet</Animatable.Text>
                      }
                      {
                        order.deliveryboy_phone !== ''
                          ?
                          <Text style={{ fontSize: 17, color: 'black' }}>Phone No.{order.deliveryboy_phone}</Text>
                          :
                          ''
                      }
                    </View>
                    {/* orderData */}
                    <View style={{ backgroundColor: 'white', elevation: 20, width: '90%', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto',marginVertical:10, padding: 10, borderRadius: 10, overflow: 'hidden' }}>
                      {
                        order.orderData.map((orderItems,index)=>{
                          return(
                            <View key={index} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:'100%',padding:5}}>
                              <Text style={{fontSize:17,color:'black'}}>Quan : {orderItems.Extra.quantity}</Text>
                              <Text style={{fontSize:17,width:'50%',color:'#FF4143',fontWeight:'bold'}}>{orderItems.foodName}</Text>
                              <Text style={{fontSize:18,color:'black'}}>₹{(parseInt(orderItems.Extra.quantity) * parseInt(orderItems.foodPrice)+parseInt(orderItems.Extra.addOnQuantity) * parseInt(orderItems.foodAddonPrice))}</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  )
}

export default TrackOrder

const styles = StyleSheet.create({
  trackOrderContainer: {
    flex: 1,
    width: '100%',

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
  }
})