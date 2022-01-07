import React from 'react';
import {Form} from "react-bootstrap";

const Email: React.FC = () => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control required name='email' type="email" placeholder="Enter email"/>
    </Form.Group>
  );
};

export default Email;
