import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () =>{
    const [info, setInfo] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3002/get')
        .then(res => {
          console.log(res.data); // 서버에서 받은 데이터
          setInfo(res.data);
        })
    }, [])
    return(
        <div>
            모델 성능
            {JSON.stringify(info.model_performance)}
            
            예측값
            {JSON.stringify(info.predictions)}
        </div>
    )
}

export default Home