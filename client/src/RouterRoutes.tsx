import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';


import Login from "./Pages/Login";
import Albums from "./Pages/Albums";
import Album from './Pages/Album'
import User from './Pages/User'
import Dashboard from "./Pages/Dashboard";


const RouterRoutes = ({logStatus, role}: any) => (
    <Routes>
        <Route path='/' element ={<Login/>}/>
        {logStatus &&
        <>
      <Route path='albums' element ={<Albums/>}/>
                <Route path = 'albums/:id' element={<Album/>}/>
                <Route path = 'users/:id' element = {<User/>}/>
        </>}
        {role === 'ADMIN' &&
        <Route path = 'dashboard' element= {<Dashboard/>}/>
        }
        {!logStatus && <Route path = '*' element={<Navigate to ='/' replace/>}/>}
        {logStatus && <Route path = '*' element={<Navigate to ='/albums' replace/>}/>}
    </Routes>
)

export default RouterRoutes
