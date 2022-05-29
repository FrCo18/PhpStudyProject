import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {Button, Container, Form} from "react-bootstrap";

const ChangePassword = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
  const changePassword = () => {
    const headers = {
      'Accept': 'application/json'
    }
    let resetToken = params.token ?? ''
    const paramsPost = {

      'token': resetToken,
      'email': email,
      'password': password,
      'password_confirmation': confirmPassword
    }
    axios.post('/api/change-password', paramsPost, {headers})
      .then((response) => {
        if (response.status === 200) {
          alert('Пароль успешно изменён!')
          setIsChangePassword(true)
        }
      })
      .catch(error => {
        alert('Ошибка при изменении пароля!')
        console.error('There was an error!', error);
      })
  }

  useEffect(() => {
    if (isChangePassword) {
      navigate('/login')
    }
  }, [isChangePassword])

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
      <h1 style={{color: "white"}}>Смена пароля</h1>
      <Form action='#'>
        {/*Email*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control id='inputEmail' onChange={event => setEmail(event.target.value)}
                        name='email' type="email" placeholder="Введите email" required/>
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
        <Button type='button' onClick={() => changePassword()} variant="primary">
          Изменить пароль
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
