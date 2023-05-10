import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false)
  const [loggedUser, setLoggedUser] = useState([])
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')))
      setIsLogin(true)
    }
  }, [])

  const GlobalState = { isLogin, setIsLogin, loggedUser, setLoggedUser, theme, setTheme }
  return <GlobalContext.Provider value={GlobalState}>{children}</GlobalContext.Provider>
}
