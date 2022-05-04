import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const navigate = useNavigate()
  const register = () => {
    const headers = {
      'Accept': 'application/json'
    }
    const params = {
      'email': email,
      'password': password,
      'password_confirmation': confirmPassword
    }
    axios.post('/api/register', params, {headers})
      .then((response) => {
        if (response.data.auth) {
          const cookies = new Cookies()
          cookies.set('auth_token', response.data.token, {path: '/'})
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      }).finally(() => {
      const cookies = new Cookies()
      if (cookies.get('auth_token')) {
        alert('Регистрация прошла успешно')
        window.location.reload();
      }
    });
  }

  //check auth
  useEffect(() => {
    const cookies = new Cookies()
    const token = cookies.get('auth_token')
    if(token){
      navigate('/')
    }
  }, [])

  return (
    <Container style={{width: '80vh'}}>
      <h1 style={{color: "white"}}>Регистрация</h1>
      <Form action='#'>
        {/*Email*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control id='inputEmail' onChange={event => setEmail(event.target.value)}
                        name='email' type="email" placeholder="Введите email" required/>
          <Form.Text className="text-muted">
            Мы никогда не передадим вашу электронную почту кому-либо еще.
          </Form.Text>
        </Form.Group>

        {/*Password*/}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control
            required
            name='password'
            placeholder="Введите пароль"
            type="password"
            id="inputPassword"
            aria-describedby="passwordHelpBlock"
            minLength={8}
            maxLength={20}
            onChange={event => setPassword(event.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Ваш пароль должен состоять из 8-20 символов, содержать буквы и цифры и
            не должен содержать пробелов, специальных символов или смайликов.
          </Form.Text>
        </Form.Group>

        {/*Confirm Password*/}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="inputPasswordConfirm">Password</Form.Label>
          <Form.Control
            required
            name='password_confirmation'
            placeholder="Повторите пароль"
            type="password"
            id="inputPasswordConfirm"
            aria-describedby="passwordHelpBlock"
            minLength={8}
            maxLength={20}
            onChange={event => setConfirmPassword(event.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Ваш пароль должен состоять из 8-20 символов, содержать буквы и цифры и
            не должен содержать пробелов, специальных символов или смайликов.
          </Form.Text>
        </Form.Group>
        <Button onClick={() => register()} variant="primary" type="button">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
