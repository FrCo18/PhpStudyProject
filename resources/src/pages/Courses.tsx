import React, {useEffect, useState} from 'react';
import axios from "axios";
import {map} from "react-bootstrap/ElementChildren";
import Auth from "../components/Auth/Auth";
import {TypeCourse} from "../components/Courses/types/TypeCourse";
import CourseList from "../components/Courses/CourseList";
import {useNavigate} from "react-router-dom";

const Courses: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false)
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('api/courses')
      .then((response) => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error.response.status);
      });
  },[])

  return (
    <div style={{color: "white"}}>
      <p>Курсы</p>

    </div>
  );
};

export default Courses;
