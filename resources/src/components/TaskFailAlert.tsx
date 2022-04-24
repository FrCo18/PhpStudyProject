import React, {useState} from 'react';
import {Alert, Button} from "react-bootstrap";

const TaskFailAlert = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Задание выполнено неверно!</Alert.Heading>
        <p>
          Проверьте, соблюдали ли вы установки задания.
        </p>
      </Alert>
    );
  }
  return <></>;
};

export default TaskFailAlert;
