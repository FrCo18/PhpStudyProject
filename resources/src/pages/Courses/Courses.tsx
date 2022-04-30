import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {Button, Card} from "react-bootstrap";
import {CourseItem, User} from "./modules/interfaces";
import Loading from "../../components/Loading";

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies()
  let token = cookies.get('auth_token')
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [isLoad, setLoad] = useState(false)
  let userInfo: User = JSON.parse((localStorage.getItem('user')) ?? '')

  //check auth
  useEffect(() => {
    if (!token) {
      alert('Авторизуйтесь!')
      navigate('/')
    }
  }, [])

  //получение списка курсов
  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    axios.get('/api/courses?' + 'id_user=' + userInfo.id, {headers})
      .then((response) => {
        if (response.data.length) {
          setCourses(response.data)
          setLoad(true)
        }
      })
  }, [])

  return (
    <div style={{color: "white"}}>
      <p>Курсы</p>
      {isLoad
        ?
        courses.map((course) => {
          return (
            <Card key={course.id_course} style={{color: 'black'}} className='mb-3'>
              <Card.Header as="h5">{course.course}</Card.Header>
              <Card.Body>
                {course.is_complete &&
                  <Card.Subtitle style={{backgroundColor: '#2aaf1a', color: 'white', textAlign: 'center'}} className="mb-2">Курс пройден</Card.Subtitle>
                }
                <Card.Title>Сложность: {course.difficulty}</Card.Title>
                <Card.Text>
                  {course.description}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate('/courses/tasks/' + course.id_course)}>Начать</Button>
              </Card.Body>
            </Card>
          );
        })
        :
        <Loading/>
      }
    </div>
  );
};

export default Courses;
