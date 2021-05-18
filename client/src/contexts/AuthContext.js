import React,{useContext,useState,useEffect} from 'react'
import { auth } from './../firebase.js'
const AutoContext = React.createContext()
export function useAuth(){
    return useContext(AutoContext)
}
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    function signUpUser(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user))
        return unsubscribe
    }, [])
    const value = {
        currentUser,
        signUpUser
    }
    return (
        <AutoContext.Provider value={value}>
            {children}
        </AutoContext.Provider>
    )
}
