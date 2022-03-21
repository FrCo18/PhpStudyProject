import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Password from "./register-components/Password";
import Email from "./register-components/Email";

const Register = () => {
  let csrf_token = '{{echo csrf_token()}}'
  return (
    <Container style={{width: '80vh'}}>
      <h1>Регистрация</h1>
      <Form action='/api/register' method='post'>
        <input  type='hidden' name='_token' value={csrf_token}/>
        <Email/>
        <Password/>
        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
