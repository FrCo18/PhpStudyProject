import React, {useEffect, useState} from 'react';
import {User} from "./Courses/modules/interfaces";
import {Button} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const AccountEdit = () => {
  const cookies = new Cookies()
  let token = cookies.get('auth_token')
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<User>()

  function accountDelete() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const params = {
      id_user: userInfo?.id,
    }

    axios.delete('/api/delete-user', {
      headers: headers,
      data: params
    }).finally(() => {
      cookies.remove('auth_token')
      localStorage.removeItem('user')

      if (!cookies.get('auth_token')) {
        alert('Аккаунт удалён!')
        navigate('/')
        window.location.reload();
      }
    })
  }

  //check auth
  useEffect(() => {
    if (!token) {
      alert('Авторизуйтесь!')
      navigate('/')
    }else {
      setUserInfo(JSON.parse((localStorage.getItem('user')) ?? ''))
    }
  }, [])

  return (
    <div>
      <Button onClick={() => accountDelete()} style={{right: '5%'}} className='mt-1'
              variant="primary"
              size="sm">
        Удалить аккаунт
      </Button>
    </div>
  );
};

export default AccountEdit;
