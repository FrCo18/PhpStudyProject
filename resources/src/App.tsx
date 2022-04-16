import React from 'react';
import {Container} from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./contexts/AuthContext";

const App = () => {

  return (
    <AuthContext.Provider value={{
     Auth: {bearerStart: 'Bearer '}
    }}>
    <BrowserRouter>
      <Container fluid={true} className={'bg-dark vh-100'}>
        <Navbar/>
        <AppRouter/>
      </Container>
    </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;

