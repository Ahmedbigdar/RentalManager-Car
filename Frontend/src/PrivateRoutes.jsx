import React from 'react'
import { Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
// import Login from './authentification/Login/Login'

const PrivateRoutes = () => {
    let auth = {'token': localStorage.getItem("token")}
  return (
    auth.token ? <Layout/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes
