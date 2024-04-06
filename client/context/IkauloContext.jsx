import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../helpers/localStorage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const IkauloContext = createContext();

export const IkauloProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    if (tokenLocalStorage) {
      // const { id } = jwtDecode(tokenLocalStorage).user;

      // axios
      //   .get(`http://localhost:3000/users/oneuser/${id}`)
      //   .then((res) => {
      //     setUser(res.data[0]);
      //     setIsLogged(true);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      axios
        .get(`http://localhost:3000/users/me`, {headers: {Authorization: `Bearer ${tokenLocalStorage}`}})
        .then((res) => {
          setUser(res.data[0]);
          setIsLogged(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <IkauloContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </IkauloContext.Provider>
  );
};
