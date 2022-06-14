import React, {useState, Reducer} from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from '../Store';
import album, { albumActions } from '../Store/albumSlice';
import { fetchAlbums } from '../Actions/album';
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
    const [token, setToken] = useState(null)

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential

    const backendResponse = await axios.post(`http://localhost:5000/google-login`,{},{ headers: {
      Authorization: `Bearer ${tokenId}`
    },})
    const backendToken = backendResponse.data.token
    console.log(backendToken)
    setToken(backendToken)
    localStorage.setItem('token',backendToken)
    navigate('/albums')
  }

  const clientId = '1062296584596-ghe50cc3iifj9j52prqqar8844ggldii.apps.googleusercontent.com'
  return (
    <div className="App">
      <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess}/>
      </GoogleOAuthProvider>
      </Provider>
    </div>
  );
}

export default Login;

