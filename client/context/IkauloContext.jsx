import React, {createContext, useEffect, useState } from 'react';
import {getLocalStorage} from '../helpers/localStorage';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export const IkauloContext = createContext();


export const IkauloProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token")
    setToken(tokenLocalStorage)

    if(tokenLocalStorage){
      const { id } = jwtDecode(tokenLocalStorage).user;

      axios
        .get(`http://localhost:3000/users/oneuser/${id}`)
        .then((res)=>console.log(res)) //TODO
        .catch((err)=>console.log(err))
    }

  }, [isLogged])
  

  return (
    <IkauloContext.Provider value = {{
      user,
      setUser,
      token,
      setToken,
      isLogged,
      setIsLogged
    }}
    >
      {children}
    </IkauloContext.Provider>
  )
}
