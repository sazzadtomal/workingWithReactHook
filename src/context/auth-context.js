import React, {useState} from "react";


export const AuthContext=React.createContext({
    isAuth:false,
    login:()=>{}
})


const AuthContextProvider=props =>{
   
   const [isAuthinticated,setISAuthincated]=useState(false)
   
    const loginHandler=()=>{
        setISAuthincated(true)
    }

    return (
        <AuthContext.Provider value={{login:loginHandler,isAuth:isAuthinticated}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider