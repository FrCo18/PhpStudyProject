import React, {useState} from 'react';
import {Button, Alert} from "react-bootstrap";

const TaskCompleteAlert = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Поздравляем! Задание успешно завершено!</Alert.Heading>
        <p>
          Можно начинать следующее!
        </p>
      </Alert>
    );
  }
  return <></>;
};

export default TaskCompleteAlert;
