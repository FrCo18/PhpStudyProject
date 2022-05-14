import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import {Link, useNavigate} from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const login = () => {
    const headers = {
      'Accept': 'application/json'
    }
    const params = {
      'email': email,
      'password': password,
    }
    axios.post('/api/login', params, {headers})
      .then((response) => {
        if (response.data.auth) {
          const cookies = new Cookies()
          cookies.set('auth_token', response.data.token, {path: '/'})
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
      })
      .catch(error => {
        alert('Не верны имя пользователя или пароль')
        console.error('There was an error!', error);
      }).finally(() => {
      const cookies = new Cookies()

      if (cookies.get('auth_token')) {
        window.location.reload();
      }
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
      <h1 style={{color: "white"}}>Авторизация</h1>
      <Form action='#'>
        {/*Email*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control id='inputEmail' onChange={event => setEmail(event.target.value)}
                        name='email' type="email" placeholder="Введите email" required/>
          <Form.Text className="text-muted">
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
          </Form.Text>
        </Form.Group>

        <Button onClick={() => login()} variant="primary" type="button">
          Войти
        </Button>
        <br/>
        <Link to='/reset-password'>Забыли пароль?</Link>
      </Form>
    </Container>
  );
};

export default Login;
