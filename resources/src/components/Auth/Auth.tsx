import React, {useEffect, useState} from 'react';
import {Container, Nav} from "react-bootstrap";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";

const Auth: React.FC = ({children}) => {
  const [auth, setAuth] = useState<boolean>(false)
  const [loginOrRegisterForm, setShowForm] = useState<React.FC>(Login)

  // useEffect(() => {
  //   axios.get('/api/checkauth').then((response) => {
  //     setAuth(response.data['is_auth'])
  //   }).catch((e) => {
  //     console.error(e)
  //   })
  // }, [])
  //

  const showLoginForm = () => {
    setShowForm(Login)
  }
  const showRegisterForm = () => {
    setShowForm(Register)
  }
  return (
    <Container>
      {auth
        ?
        children
        :
        <Container>
          <Nav className="justify-content-center" as="ul">
            <Nav.Item className={'mx-5'} as="li" onClick={() => showLoginForm()}>Авторизоваться</Nav.Item>
            <Nav.Item className={'mx-5'} as="li" onClick={() => showRegisterForm()}>Зарегистрироваться</Nav.Item>
          </Nav>
          {loginOrRegisterForm}
        </Container>
      }
    </Container>
  );
};

export default Auth;
