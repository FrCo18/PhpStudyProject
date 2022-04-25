import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {TaskItem, TaskResult, User} from "./modules/interfaces";
import Cookies from "universal-cookie";
import Loading from "../../components/Loading";
import TaskCompleteAlert from "../../components/TaskCompleteAlert";
import TaskFailAlert from "../../components/TaskFailAlert";

const TaskPage = () => {
  const params = useParams()
  const [task, setTask] = useState<TaskItem>()
  const [isLoad, setLoad] = useState(false)
  const [phpCode, setPhpCode] = useState<string>()
  const [compileResult, setCompileResult] = useState<TaskResult>()
  let userInfo: User = JSON.parse((localStorage.getItem('user')) ?? '')
  const navigate = useNavigate()
  const cookies = new Cookies()
  let token = cookies.get('auth_token')

  function checkCode() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const params = {
      php_code: phpCode,
      course_name: task?.course_name,
      level_number: task?.level_number,
      id_user: userInfo.id,
      id_task: task?.id_task
    }

    axios.post('/api/courses/check-task', params, {headers})
      .then((response) => {
        if (response.data) {
          let object = response.data

          if (typeof object !== 'object') {
            object = JSON.parse(response.data.toString().replace(/.*?(\{)/, '$1'))
          }
          let echo_text = '<pre>' + (object.echo_text === '' ? object.error_text : object.echo_text) + '</pre>';
          setCompileResult({
            is_complete: object.is_complete,
            eval_result: object.eval_result,
            echo_text: echo_text

          })
        }
      })
  }

  //подгрузка задания
  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }

    axios.get('/api/courses/task-by-id?id_task=' + params.id_task + '&' + 'id_user=' + userInfo.id, {headers})
      .then((response) => {
        if (response.data.id_task) {
          setTask(response.data)
          setLoad(true)
        }
      })
  }, [])

  //установка php_code
  useEffect(() => {
    if (task) {
      setPhpCode(task.php_code)
    }
  }, [task])

  function showAlertComplete() {
    if (compileResult) {
      if (compileResult.is_complete) {
        return <TaskCompleteAlert/>
      } else {
        return <TaskFailAlert/>
      }
    }

    return (
      <></>
    );
  }

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
                <pre>{task?.theory}</pre>
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
                      <div dangerouslySetInnerHTML={{__html: compileResult.echo_text.toString()}}/>
                      :
                      'RESULT'
                    }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className='mt-3'>
            {showAlertComplete()}
          </div>
        </div>)
        : <Loading/>
      }
    </div>
  );
};

export default TaskPage;
