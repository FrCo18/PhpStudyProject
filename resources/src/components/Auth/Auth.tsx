import React, {useEffect, useState} from 'react';
import {Container, Nav} from "react-bootstrap";
import axios from "axios";
import Login from "./Login";
import Register from "../../pages/Auth/Register";
import {useNavigate} from "react-router-dom";

const Auth: React.FC = ({children}) => {

  const [loginOrRegisterForm, setShowForm] = useState<React.FC>(Login)

  const showLoginForm = () => {
    setShowForm(Login)
  }
  const showRegisterForm = () => {
    setShowForm(Register)
  }
  return (
    <Container>

    </Container>
  );
};

export default Auth;
