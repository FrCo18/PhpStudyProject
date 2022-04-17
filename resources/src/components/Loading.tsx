import React from 'react';
import {Spinner} from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner style={{position: 'absolute', top: '50%', right: '50%'}}
             animation="border" variant="light"/>
  );
};

export default Loading;
