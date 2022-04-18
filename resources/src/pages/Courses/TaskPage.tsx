import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {TaskItem} from "./modules/interfaces";
import Cookies from "universal-cookie";
import Loading from "../../components/Loading";

const TaskPage = () => {
  const params = useParams()
  const [task, setTask] = useState<TaskItem>()
  const [isLoad, setLoad] = useState(false)
  const [phpCode, setPhpCode] = useState<string>()
  const [compileResult, setCompileResult] = useState<string>()
  const navigate = useNavigate()
  const cookies = new Cookies()
  let token = cookies.get('auth_token')

  function checkCode() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const params = {
      php_code: phpCode
    }

    axios.post('/api/courses/check-task', params, {headers})
      .then((response) => {
        if (response.data) {
          setCompileResult(response.data)
        }
      })
  }

  //подгрузка задания
  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }

    axios.get('/api/courses/task-by-id?id=' + params.id_task, {headers})
      .then((response) => {
        if (response.data.id_task) {
          setTask(response.data)
          setLoad(true)
        }
      })
  }, [])

  useEffect(()=> {
    setCompileResult(compileResult?.toString().replace("\n", '<br/>'))
  }, [compileResult])

  //установка php_code
  useEffect(() => {
    if (task) {
      setPhpCode(task.php_code)
    }
  }, [task])

  //check auth
  useEffect(() => {
    if (!token) {
      alert('Авторизуйтесь!')
      navigate('/')
    }
  }, [])

  return (
    <div style={{color: 'white'}}>
      {isLoad
        ?
        (<div className='mt-3'>
            <Card style={{color: 'black'}}>
              <Card.Body>
                <Card.Title>{task?.task_name}</Card.Title>
                <Card.Text>
                  {task?.theory}
                </Card.Text>
              </Card.Body>
            </Card>

            <Row className='mt-3'>
              <h2>Ваш код</h2>
              <Col sm={7}>
                <Form>
                  <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                    <Form.Control onChange={event => setPhpCode(event.target.value)} defaultValue={task?.php_code}
                                  value={phpCode}
                                  style={{backgroundColor: '#434447', color: 'white'}}
                                  as="textarea" rows={10}/>
                  </Form.Group>
                  <Button onClick={() => checkCode()} variant="primary" type="button">
                    Проверить
                  </Button>
                </Form>
              </Col>
              <Col>
                <Card>
                  <Card.Header style={{backgroundColor: 'black'}}>Terminal</Card.Header>
                  <Card.Body style={{backgroundColor: '#434447', minHeight: '10em'}}>
                    <Card.Text>
                      {compileResult
                        ?
                        <div dangerouslySetInnerHTML={{__html: compileResult}}/>
                        :
                        'RESULT'
                      }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>)
        : <Loading/>
      }
    </div>
  );
};

export default TaskPage;
