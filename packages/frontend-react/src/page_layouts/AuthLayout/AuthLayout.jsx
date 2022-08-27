import React from 'react';
import './AuthLayout.scss'
import InfoPopUp from '../../components/InfoPopUp/InfoPopUp.jsx'

export default React.memo(function AuthLayout({ children }) {
    return (
        <>
            <div className="auth__container">
                <div className="auth__left-side"></div>
                <div className="auth__right-side">
                    <div className="auth__content">{children}</div>
                    <InfoPopUp color={'white'} width={40} style={{position: 'absolute', top: '17px',right: '21px'}} popupStyle={{left: '-280px'}}>
                        <p>Следуйте инструкциям</p>
                        <p>Команды необходимо ввести, либо выбрать из доступных и затем отправить сообщение</p>
                        <p>Например для того чтобы войти необходимо набрать "Войти"</p></InfoPopUp>
                </div>
            </div>
        </>
    )
})