import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import robotImg from '../../assets/img/robot-404.png'
import s from './Page404.module.scss'
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';

export default function Page404() {
    const navigate = useNavigate()
    function goBack() {
        navigate(-1)
    }
    return (
        <>
            <TransitionLayout from='bottom'>
                <div className={s['not-found-page__container']}>
                    <div className={s['not-found-page__left-side']}>
                        <img src={robotImg} alt='' className={s['not-found-page__image']} />
                    </div>
                    <div className={s['not-found-page__right-side']}>
                        <p className={s['not-found-page__text']}>Такого раздела не существует</p>
                        <Button text='Вернуться' handleClick={goBack} />
                    </div>
                </div>
            </TransitionLayout>
        </>
    )
}