import React from 'react';
import {Form} from "react-bootstrap";

const Password: React.FC = () => {
  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name='password' required type="password" placeholder="Password" />
    </Form.Group>
  );
};

export default Password;
