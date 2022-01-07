import React from 'react';
import {Form} from "react-bootstrap";

const Password: React.FC = () => {
  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        required
        name='password'
        placeholder="Enter password"
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        minLength={8}
        maxLength={10}
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers, and
        must not contain spaces, special characters, or emoji.
      </Form.Text>
    </Form.Group>
  );
};

export default Password;
