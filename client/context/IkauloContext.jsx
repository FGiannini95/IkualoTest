import React, { Children, createContext, useState } from 'react'

export const IkauloContext = createContext()

export const IkauloProvider = (children) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false)


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
