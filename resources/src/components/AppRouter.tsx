import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses/Courses";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Tasks from "../pages/Courses/Tasks";
import TaskPage from "../pages/Courses/TaskPage";
import AccountEdit from "../pages/AccountEdit";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Home/>}/>

      {/*Courses routes*/}
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/courses/tasks/:id_course' element={<Tasks/>}/>
      <Route path='/courses/tasks/:id_course/:id_task' element={<TaskPage/>}/>

      <Route path='/about' element={<About/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/account-edit' element={<AccountEdit/>}/>
    </Routes>
  );
};

export default AppRouter;
