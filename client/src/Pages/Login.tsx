import React, {useState, Reducer} from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from '../Store';
import {userActions} from '../Store/userSlice';
import { fetchAlbums } from '../Actions/album';
import {useNavigate} from 'react-router-dom'
import classes from './Login.module.css'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [token, setToken] = useState(null)

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential

    const backendResponse = await axios.post(`http://localhost:5000/google-login`,{},{ headers: {
      Authorization: `Bearer ${tokenId}`
    },})
    const backendToken = backendResponse.data.token
    const user = backendResponse.data.user
    console.log(user)
    const role = user.role
    setToken(backendToken)
    console.log(backendToken)
    dispatch(userActions.signIn(user))
    localStorage.setItem('token',backendToken)
    localStorage.setItem('role', role)
    navigate('/albums')
  }

  const clientId = '1062296584596-ghe50cc3iifj9j52prqqar8844ggldii.apps.googleusercontent.com'
  return (
    <div className={classes.login}>
      <Provider store={store}>
      <GoogleOAuthProvider  clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess}/>
      </GoogleOAuthProvider>
      </Provider>
    </div>
  );
}

export default Login;

