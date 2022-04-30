import React from 'react';
import {Card, Carousel, Container} from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";

const About: React.FC = () => {
  return (
    <div>
      <Card style={{backgroundColor: '#434447', color: 'white'}}>
        <Card.Img variant="top" src={require('../recourses/AdminIcon.png').default}
                  style={{width: '50%'}}
                  className='mx-auto'
        />
        {/*<img src={require('./AdminIcon.png').default} />*/}
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
        {/*<img src={require('./AdminIcon.png').default} />*/}
        <Card.Body>
          <Card.Text>
            Серверная часть сайта также написана на языке программирования PHP версии 8.0.
          </Card.Text>
        </Card.Body>
      </Card>

      {/*<Carousel>*/}
      {/*  <Carousel.Item>*/}
      {/*    <img*/}
      {/*      className="d-block w-100"*/}
      {/*      src={require("../recourses/AdminIcon.png").default}*/}
      {/*      alt="First slide"*/}
      {/*    />*/}
      {/*    <Carousel.Caption>*/}
      {/*      <h3>First slide label</h3>*/}
      {/*      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
      {/*    </Carousel.Caption>*/}
      {/*  </Carousel.Item>*/}
      {/*  <Carousel.Item>*/}
      {/*    <img*/}
      {/*      className="d-block w-100"*/}
      {/*      src="holder.js/800x400?text=Second slide&bg=282c34"*/}
      {/*      alt="Second slide"*/}
      {/*    />*/}

      {/*    <Carousel.Caption>*/}
      {/*      <h3>Second slide label</h3>*/}
      {/*      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
      {/*    </Carousel.Caption>*/}
      {/*  </Carousel.Item>*/}
      {/*  <Carousel.Item>*/}
      {/*    <img*/}
      {/*      className="d-block w-100"*/}
      {/*      src="holder.js/800x400?text=Third slide&bg=20232a"*/}
      {/*      alt="Third slide"*/}
      {/*    />*/}

      {/*    <Carousel.Caption>*/}
      {/*      <h3>Third slide label</h3>*/}
      {/*      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
      {/*    </Carousel.Caption>*/}
      {/*  </Carousel.Item>*/}
      {/*</Carousel>*/}
    </div>
  );
};

export default About;
