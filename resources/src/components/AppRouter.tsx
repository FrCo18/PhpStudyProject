import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../router/routes";
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Home/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
  );
};

export default AppRouter;
