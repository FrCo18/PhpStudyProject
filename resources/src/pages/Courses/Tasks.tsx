import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import {TaskItem} from "./modules/interfaces";
import Loading from "../../components/Loading";



const Tasks: React.FC = () => {
  // console.log(params.id_course)
  const params = useParams()
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [isLoad, setLoad] = useState(false)
  const cookies = new Cookies()
  let token = cookies.get('auth_token')

  //получение списка заданий
  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }

    axios.get('/api/courses/tasks-by-course-id?id=' + params.id_course, {headers})
      .then((response) => {
        if(response.data.length){
          setTasks(response.data)
          setLoad(true)
        }
      })
  },[])

  //check auth
  useEffect(() => {
    if (!token) {
      alert('Авторизуйтесь!')
      navigate('/')
    }
  }, [])

  return (
    <div style={{color: "white"}}>
      <p>Задания</p>
      {isLoad
        ?
        tasks.map((task) => {
          return (
            <Card key={task.id_task} style={{color: 'black'}} className='mb-3'>
              <Card.Header as="h5">Уровень: {task.level_number}</Card.Header>
              <Card.Title>{task.task_name}</Card.Title>
              <Card.Body>
                <Button variant="primary" onClick={() => navigate('/courses/tasks/' + task.id_course + '/' + task.id_task)}>Начать</Button>
              </Card.Body>
            </Card>
          );
        })
        : <Loading/>
      }
    </div>
  );
};

export default Tasks;