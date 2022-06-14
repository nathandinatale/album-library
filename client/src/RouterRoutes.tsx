import React from "react";
import {Routes, Route} from 'react-router-dom'

import Login from "./Pages/Login";
import Albums from "./Pages/Albums";
import Album from './Pages/Album'
import Dashboard from "./Pages/Dashboard";

const RouterRoutes = () => (
    <Routes>
        <Route path='/' element ={<Login/>}/>
        <Route path = 'dashboard' element= {<Dashboard/>}/>
        <Route path='albums' element ={<Albums/>}/>
        <Route path = 'albums/:id' element={<Album/>}/>
    </Routes>
)

export default RouterRoutes
