import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')

  const resetPassword = () => {
    const headers = {
      'Accept': 'application/json'
    }
    const params = {
      'email': email
    }
    axios.post('/api/forgot-password', params, {headers})
      .then((response) => {
        if (response.status === 200) {
          alert('Письмо с востанавлением пароля отправлено!')
        }
      })
      .catch(error => {
        alert('Ошибка при отправке письма с воcстановлением пароля')
        console.error('There was an error!', error);
      }).finally(() => {
    });
  }

  //check auth
  useEffect(() => {
    const cookies = new Cookies()
    const token = cookies.get('auth_token')
    if (token) {
      navigate('/')
    }
  }, [])
  return (
    <Container style={{width: '80vh'}}>
      <h1 style={{color: "white"}}>Востановление пароля</h1>
      <Form action='#'>
        {/*Email*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control id='inputEmail' onChange={event => setEmail(event.target.value)}
                        name='email' type="email" placeholder="Введите email" required/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Button onClick={() => resetPassword()} variant="primary" type="button">
          Отправить письмо с востановлением пароля
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
