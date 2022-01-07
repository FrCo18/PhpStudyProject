import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import AppRouter from "../AppRouter";
import {Link} from "react-router-dom";
import axios from "axios";

const Navbar: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false)
  const [doLogout, setDoLogout] = useState<boolean>(false)
  useEffect(() => {
    axios.get('/api/checkauth').then((response) => {
      setAuth(response.data['is_auth'])

    }).catch((e) => {
      console.error(e)
    })
    console.log('Use Effect for check auth')
  }, [doLogout])

  useEffect(() => {
    if (doLogout) {
      // setDoLogout(false)
      axios.post('/api/logout').then((response) => {
      }).catch((e) => {
        console.error(e)
      }).finally(()=>{
        window.location.reload();
      })
    }
    console.log('Use Effect for logout')
  }, [doLogout])

  const changeDoLogoutStatus = () => {
    setDoLogout(true)
  }

  return (
    <Container>
      <Nav className="justify-content-center" defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link><Link to='/'>Главная страница</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1"><Link to='/courses'>Начать курсы</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2"><Link to='/about'>О проекте</Link></Nav.Link>
        </Nav.Item>
        {auth &&
        <Button onClick={() => changeDoLogoutStatus()} style={{position: 'absolute', right: '5%'}} className='mt-1'
                variant="primary"
                size="sm">
          Logout
        </Button>
        }

      </Nav>

    </Container>
  );
};

export default Navbar;
