import React from 'react';
import {Col, Nav, Row} from "react-bootstrap";
import AppRouter from "../AppRouter";
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
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
    </Nav>
  );
};

export default Navbar;
