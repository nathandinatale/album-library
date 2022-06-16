import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import {useNavigate, Link} from 'react-router-dom'

import Routes  from './RouterRoutes';
import { userActions } from "./Store/userSlice";
import { AppBar, Toolbar, Typography, Drawer, Box } from '@mui/material'



export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')


  console.log(role)

  useEffect(() => {
    dispatch(userActions.checkLogin())
    if(!token){
      navigate('/')
    }
  },[])


  return (
    <>
    {<Routes logStatus={token} role={role}/>}
    </>
  );
}

