import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUpPage';

export function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Login/>}/>
        <Route path ='/signup' element={<SignUp/>}/>
        <Route path ='/home' element={<Home/>}/>
        <Route path='*' element={<h1>404 Not found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}