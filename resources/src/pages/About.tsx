import React from 'react';
import {Card} from "react-bootstrap";

const About: React.FC = () => {
  return (
    <div>
      <Card style={{backgroundColor: '#434447', color: 'white'}}>
        <Card.Img variant="top" src={require('../recourses/AdminIcon.png').default}
                  style={{width: '50%'}}
                  className='mx-auto'
        />
        <Card.Body>
          <Card.Text>
            Разработчик сайта: Борисов Никита Олегович.
            <br/>
            Идея разработки:
            <br/>
            Познакомить людей с программированием, а в частности с языком программирования PHP.
            <br/>
            Здесь можно получить первое представление как программировать и с этими знаниями было проще понять
            <br/>
            что изучать.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="https://vk.com/frco18">Страница в VK</Card.Link>
        </Card.Body>
      </Card>

      <Card className='mt-2' style={{backgroundColor: '#434447', color: 'white'}}>
        <Card.Img variant="top" src={require('../recourses/PHP.png').default}
                  style={{width: '50%'}}
                  className='mx-auto'
        />
        <Card.Body>
          <Card.Text>
            Серверная часть сайта также написана на языке программирования PHP версии 8.0.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;
