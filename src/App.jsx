import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Home from './pages/Home'
import ApiTest from './pages/ApiTest'
import { useContext } from 'react'
import { GlobalContext } from './config/GlobalState'
import Auth from './pages/Auth'

export default function App() {
  const { isLogin } = useContext(GlobalContext)
  return (
    <Routes>
      {!isLogin ? <Route path="/" element={<Auth />} /> : <Route path="/*" element={<Home />} />}
      <Route path="/apitest" element={<ApiTest />} />
    </Routes>
  )
}
