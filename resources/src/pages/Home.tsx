import React, {useEffect, useState} from 'react';
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";

const Home: React.FC = () => {
  const [auth, setAuth] = useState(false)


  //check auth
  useEffect(() => {
    const cookies = new Cookies()
    const token = cookies.get('auth_token')
    if (token) {
      setAuth(true)
    }
  }, [])

  return (
    <Card className="text-center">
      <Card.Header>Повествование</Card.Header>
      <Card.Body>
        <Card.Title>PHP Learning</Card.Title>
        <Card.Text>
          Приветствуем! Здесь ты сможешь начать изучать востребованный язык программирования PHP
        </Card.Text>
        <Card.Text>
          У нас есть курсы даже для тех кто уже знаком с языком
        </Card.Text>
        <Button variant="primary">
          {
            auth
              ? <Link style={{color: 'white', textDecoration: 'none'}} to='/courses'>Перейти к курсам</Link>
              :
              <Link style={{color: 'white', textDecoration: 'none'}} to='/courses'>
                Начать свой
                первый курс сейчас
              </Link>

          }
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">PHP Courses</Card.Footer>
    </Card>
  );
};

export default Home;
