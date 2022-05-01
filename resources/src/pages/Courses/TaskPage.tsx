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
  const [isOnlyCompile, setIsOnlyCompile] = useState(false)
  const [rowsTextArea, setRowsTextArea] = useState<number>(10)
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
      id_task: task?.id_task,
      id_course: task?.id_course
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
          setIsOnlyCompile(false)
        }
      })
  }

  function compileCode(){
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const params = {
      php_code: phpCode,
    }

    axios.post('/api/compile-code', params, {headers})
      .then((response) => {
        if (response.data) {
          let object = response.data

          if (typeof object !== 'object') {
            object = JSON.parse(response.data.toString().replace(/.*?(\{)/, '$1'))
          }
          let echo_text = '<pre>' + (object.echo_text === '' ? object.error_text : object.echo_text) + '</pre>';
          setCompileResult({
            is_complete: compileResult?.is_complete ?? false,
            eval_result: compileResult?.eval_result ?? '',
            echo_text: echo_text

          })
          setIsOnlyCompile(true)
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
          let task = response.data
          task.theory = task.theory.replace(/\n/g, '<br />')
          setPhpCode(task.php_code)
          setTask(task)
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

  //установка количества строк в textArea
  useEffect(() => {
    let countRows = (phpCode?.match(/\n/g) ?? []).length
    countRows = countRows < 10 ? 10 : countRows
    setRowsTextArea(countRows + 2)
  }, [phpCode])

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
                <div dangerouslySetInnerHTML={{__html: task?.theory ?? ''}}/>
              </Card.Text>
            </Card.Body>
          </Card>

          <Row className='mt-3'>
            <h2>Ваш код</h2>
            <Col sm={7}>
              <Form className='mb-3'>
                <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                  <Form.Control onChange={event => setPhpCode(event.target.value)} defaultValue={phpCode}
                                value={phpCode}
                                style={{backgroundColor: '#434447', color: 'white'}}
                                as="textarea" rows={rowsTextArea}/>
                </Form.Group>
                <Button onClick={() => checkCode()} variant="primary" type="button">
                  Проверить
                </Button>
                <Button onClick={() => compileCode()} className='ms-2' variant="primary" type="button">
                  Скомпилировать
                </Button>
                <Button onClick={() => navigate('/courses/tasks/' + task?.id_course)} className='ms-2' variant="primary" type="button">
                  Назад к заданиям
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
          {
            !isOnlyCompile?
              <div className='mt-3'>
                {showAlertComplete()}
              </div>
              :''
          }

        </div>)
        : <Loading/>
      }
    </div>
  );
};

export default TaskPage;
