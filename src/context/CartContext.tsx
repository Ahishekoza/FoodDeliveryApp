import { useState, useEffect, useContext, createContext } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'

import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loggedInUser, setLoggedInUser] = useAuth()

  useEffect(() => {
    if (loggedInUser) {
      // User is logged in, fetch data from UsersCart based on their UID
      const userCartRef = firebase.firestore().collection('UsersCart').doc(loggedInUser.uid);

      userCartRef.onSnapshot((doc) => {
        if (doc.exists) {
          setCart(doc.data().Cart);
        } else {
          setCart([]); // Handle the scenario where the document doesn't exist
        }
      });
    }
  }, [loggedInUser]);

  return (
    <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)