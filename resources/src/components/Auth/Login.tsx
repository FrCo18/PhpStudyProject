import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Password from "./login-components/Password";
import Email from "./login-components/Email";

const Login: React.FC = () => {
  return (
    <Container style={{width: '80vh'}}>
      <h1>Авторизация</h1>
      <Form action='/api/login' method='post'>
        <Email/>
        <Password/>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
