import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function ErrorForPage(){
    const navigate = useNavigate()
   return(
       <>
       <div className="" style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        Произошла ошибка
        <Button text='Вернуться' handleClick={()=>navigate(-1)}/>
       </div>
       </>
   )
}