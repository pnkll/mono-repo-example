import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';

export default function Page404() {
    const navigate = useNavigate()
    function goBack() {
        navigate(-1)
    }
    return (
        <>
            Такого раздела не существует
            <Button text='Вернуться' handleClick={goBack} />
        </>
    )
}