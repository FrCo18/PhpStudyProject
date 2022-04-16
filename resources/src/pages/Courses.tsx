import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {Button, Card} from "react-bootstrap";

interface CourseInterface{
  id_course: number,
  course: string,
  difficulty: string,
  description: string
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies()
  let token = cookies.get('auth_token')
  const [courses, setCourses] = useState<CourseInterface[]>([])
  const [isLoad, setLoad] = useState(false)

  //check auth
  useEffect(() => {
    if(!token){
      console.log('Авторизуйтесь!')
      navigate('/')
    }
  }, [])

  //получение списка курсов
  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    axios.get('api/courses', {headers})
      .then((response) => {
      if(response.data.length){
        setCourses(response.data)
      }
    })
  },[])

  return (
    <div style={{color: "white"}}>
      <p>Курсы</p>
      {
        courses.map((course) => {
          return (
              <Card key={course.id_course} style={{color: 'black'}} className='mb-3'>
                <Card.Header as="h5">{course.course}</Card.Header>
                <Card.Body>
                  <Card.Title>Сложность: {course.difficulty}</Card.Title>
                  <Card.Text>
                    {course.description}
                  </Card.Text>
                  <Button variant="primary">Начать</Button>
                </Card.Body>
              </Card>
          );
        })
      }
    </div>
  );
};

export default Courses;
