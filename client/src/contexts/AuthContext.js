import React,{useContext,useState,useEffect} from 'react'
import { auth } from './../firebase.js'
const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email,password) => auth.createUserWithEmailAndPassword(email,password);
    const signin = (email,password) => auth.signInWithEmailAndPassword(email,password);
    const logout = () => auth.signOut();
    const resetPassword = email => auth.sendPasswordResetEmail(email)
    const updateEmail = email => currentUser.updateEmail(email)
    const updatePassword = password => currentUser.updateEmail(password)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
