import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button.jsx';
import robotImg from '@assets/img/robot-404.png'
import s from './Page404.module.scss'
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';

export default function Page404() {
    const navigate = useNavigate()
    function goBack() {
        navigate(-1,{replace:true})
    }
    return (
        <>
            <TransitionOverlay from='bottom'>
                <div className={s['not-found-page__container']}>
                    <div className={s['not-found-page__left-side']}>
                        <img src={robotImg} alt='' className={s['not-found-page__image']} />
                    </div>
                    <div className={s['not-found-page__right-side']}>
                        <p className={s['not-found-page__text']}>Такого раздела не существует</p>
                        <Button text='Вернуться' handleClick={goBack} />
                    </div>
                </div>
            </TransitionOverlay>
        </>
    )
}