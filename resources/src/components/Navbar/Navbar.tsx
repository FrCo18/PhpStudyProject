import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Navbar: React.FC = () => {
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    const cookies = new Cookies()
    const authToken = cookies.get('auth_token')

    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    }

    cookies.remove('auth_token')
    localStorage.removeItem('user')

    axios.post('/api/logout', null, {headers})
      .then((response) => {
      })
      .catch(error => {
        console.error('There was an error!', error);
      }).finally(() => {
      const cookies = new Cookies()

      if (!cookies.get('auth_token')) {
        setAuth(false)
        alert('Вы вышли из системы')
        navigate('/')
        window.location.reload();
      }
    });
  }

  const checkAuth = () => {
    const cookies = new Cookies()
    if (cookies.get('auth_token')) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }

  useEffect(() => checkAuth(), [])

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
          <Nav.Link eventKey="link-2"><Link to='/about'>О нас</Link></Nav.Link>
        </Nav.Item>
        {auth ?
          <Button onClick={() => logout()} style={{ right: '5%'}} className='mt-1'
                  variant="primary"
                  size="sm">
            Logout
          </Button>
          :
          <div style={{float: 'right', right: '5%'}}>
            <Button onClick={() => navigate('/login')}  className='mt-1'
                    variant="primary"
                    size="sm">
              Войти
            </Button>
            <Button onClick={() => {navigate('/register')}}  className='mt-1 ms-1'
                    variant="primary"
                    size="sm">
              Зарегистрироваться
            </Button>
          </div>
        }


      </Nav>
    </Container>
  );
};

export default Navbar;
