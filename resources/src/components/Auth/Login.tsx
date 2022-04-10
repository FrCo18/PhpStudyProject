import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Password from "./login-components/Password";
import Email from "./login-components/Email";
import axios from "axios";
import {persistState} from "redux-devtools";

const Login: React.FC = () => {
  // const [formInput, setFormInput] = useState({email: '', password: ''})
  // const updateFormInput = (e: any): void => {
  //   e.persist()
  //   setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
  // }
  // const signIn = (e: any) => {
  //   e.preventDefault()
  //   axios.get('/sanctum/csrf-cookie').then(() => {
  //     axios.post('/api/login',formInput)
  //   });
  // }
  return (
    <Container style={{width: '80vh'}}>
      <h1>Авторизация</h1>
      <Form action='/api/login' method='post'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required name='email' type="email" placeholder="Enter email"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' required type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
