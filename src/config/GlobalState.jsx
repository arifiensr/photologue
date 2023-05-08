import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (localStorage.getItem('token')) setIsLogin(true)
  }, [isLogin])

  const GlobalState = { isLogin, setIsLogin, theme, setTheme }
  return <GlobalContext.Provider value={GlobalState}>{children}</GlobalContext.Provider>
}
