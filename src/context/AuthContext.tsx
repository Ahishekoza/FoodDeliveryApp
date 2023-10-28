import {useState,useEffect,useContext,createContext} from 'react'
import {firebase} from '../Firebase/FirebaseConfig'
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
        
  const checkLogin = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {    
        setUser(user)
      } else {
        setUser(null)
      }

    })
  }
    useEffect(()=>{
        checkLogin()
    },[])

    return (
        <AuthContext.Provider value={[user,setUser]}>{children}</AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)