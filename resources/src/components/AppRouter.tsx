import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Cookies from "universal-cookie";

const AppRouter: React.FC = () => {
  const cookies = new Cookies()
  let authToken = cookies.get('auth')
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Home/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  );
};

export default AppRouter;
