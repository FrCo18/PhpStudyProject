import React from 'react';
import {Form} from "react-bootstrap";

const Email:React.FC = () => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control name='email' type="email" placeholder="Enter email" required/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
};

export default Email;
