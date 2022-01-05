import React, {useEffect, useState} from 'react';
import axios from "axios";
import {map} from "react-bootstrap/ElementChildren";

const Courses: React.FC = () => {

  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:3001/news').then((response) => {
      console.log(response.data)
      setNews(response.data)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div style={{color: "white"}}>
      <div>Курсы</div>
      {news.length > 0 ?
        news.map(el =>
          <div><img src={el.image} alt='image' style={{width: '100px'}}/></div>
        )
        : ''
      }
    </div>
  );
};

export default Courses;
