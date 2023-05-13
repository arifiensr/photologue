import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Home from './pages/Home'
import ApiTest from './pages/ApiTest'
import { useContext } from 'react'
import { GlobalContext } from './config/GlobalState'
import Auth from './pages/Auth'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import Dashboard from './components/dashboard/Dashboard'
import Post from './components/post/TimelinePost'
import ErrorPage from './pages/ErrorPage'

export default function App() {
  const { isLogin } = useContext(GlobalContext)
  return (
    <Routes>
      {!isLogin ? (
        <Route path="/" element={<Auth />} errorElement={<ErrorPage />} />
      ) : (
        <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/u/:id" element={<Profile />} />
          <Route path="/p/:id" element={<Post />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Route>
      )}
      <Route exact path="/apitest" element={<ApiTest />} />
    </Routes>
  )
}
