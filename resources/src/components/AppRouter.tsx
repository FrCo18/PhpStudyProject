import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import Register from "../pages/Auth/Register";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Home/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  );
};

export default AppRouter;
