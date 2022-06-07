import React, {useState} from 'react';
import axios from 'axios'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

function App() {
  const [token, setToken] = useState(null)

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential

    const backendResponse = await axios.post(`http://localhost:5000/google-login`,{},{ headers: {
      Authorization: `Bearer ${tokenId}`
    },})
    const backendToken = backendResponse.data.token
    console.log(backendToken)
    setToken(backendToken)
  }

  const clientId = '1062296584596-ghe50cc3iifj9j52prqqar8844ggldii.apps.googleusercontent.com'
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess}/>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
