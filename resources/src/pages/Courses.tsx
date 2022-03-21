import React, {useEffect, useState} from 'react';
import axios from "axios";
import {map} from "react-bootstrap/ElementChildren";
import Auth from "../components/Auth/Auth";
import {TypeCourse} from "../components/Courses/types/TypeCourse";
import CourseList from "../components/Courses/CourseList";

const Courses: React.FC = () => {
  // const [courses, setCourses] = useState<TypeCourse[]>([])
  // useEffect(() => {
  //   axios.get('/api/courses').then((response) => {
  //     setCourses(response.data)
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  // }, [])

  // useEffect(() => {
  //
  // }, [courses])
  return (
    <div style={{color: "white"}}>
      <p>Курсы</p>
      <Auth>
        {/*<CourseList/>*/}
      </Auth>
    </div>
  );
};

export default Courses;
