import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Email from "../../components/Auth/register-components/Email";
import axios from "axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const register = () => {
    const headers = {
      'Accept': 'application/json'
    }
    const params = {
      'email': email,
      'password': password,
      'password_confirmation': confirmPassword
    }
    axios.post('api/register', params, {headers})
      .then((response) => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  return (
    <Container style={{width: '80vh'}}>
      <h1 style={{color: "white"}}>Регистрация</h1>
      <Form action='#'>
        {/*Email*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control id='inputEmail' onChange={event => setEmail(event.target.value)}
                        name='email' type="email" placeholder="Enter email" required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/*Password*/}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control
            required
            name='password'
            placeholder="Enter password"
            type="password"
            id="inputPassword"
            aria-describedby="passwordHelpBlock"
            minLength={8}
            maxLength={20}
            onChange={event => setPassword(event.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and numbers, and
            must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>

        {/*Confirm Password*/}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="inputPasswordConfirm">Password</Form.Label>
          <Form.Control
            required
            name='password_confirmation'
            placeholder="Enter password"
            type="password"
            id="inputPasswordConfirm"
            aria-describedby="passwordHelpBlock"
            minLength={8}
            maxLength={20}
            onChange={event => setConfirmPassword(event.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and numbers, and
            must not contain spaces, special characters, or emoji.
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
