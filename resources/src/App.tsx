import React from 'react';
import {Container} from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid={true} className={'bg-dark vh-100'}>
        <Navbar/>
        <AppRouter/>
      </Container>
    </BrowserRouter>
  );
};

export default App;

