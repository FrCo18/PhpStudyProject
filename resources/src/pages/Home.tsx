import React from 'react';
import {Card, Button, Container} from "react-bootstrap";

const Home: React.FC = () => {
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
        <Button variant="primary">Начать свой первый курс сейчас</Button>
      </Card.Body>
      <Card.Footer className="text-muted">PHP Courses</Card.Footer>
    </Card>
  );
};

export default Home;
