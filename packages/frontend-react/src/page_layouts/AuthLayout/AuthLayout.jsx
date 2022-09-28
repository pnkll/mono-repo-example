import React from 'react';
import s from './AuthLayout.module.scss'
import InfoPopUp from '../../components/InfoPopUp/InfoPopUp.jsx'
import TransitionLayout from '../TransitionLayout/TransitionLayout.jsx';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../../store/slices/notificationsSlice';
import _ from 'lodash';
import Notification from '../../components/Notification/Notification.jsx';

export default function AuthLayout() {
    const notificationsList = useSelector(selectNotifications)
    return (
        <>
            <TransitionLayout from='right' overflowX={'visible'}>
                <div className={s["auth__container"]}>
                    <div className={s["auth__left-side"]}>
                        {!_.isEmpty(notificationsList) && <div className={s["auth__notifications__wrapper"]}>
                            {notificationsList.map(el => <Notification key={el.id} id={el.id} type={el.type} message={el.message} from='left'/>)}
                        </div>}
                    </div>
                    <div className={s["auth__right-side"]}>
                        <div className={s["auth__content"]}>
                            <Outlet />
                        </div>
                        <InfoPopUp color={'white'} width={40} style={{ position: 'absolute', top: '17px', right: '21px' }} popupStyle={{ left: '-280px' }}>
                            <p>Следуйте инструкциям</p>
                            <p>Команды необходимо ввести, либо выбрать из доступных и затем отправить сообщение</p>
                            <p>Например для того чтобы войти необходимо набрать "Войти"</p></InfoPopUp>
                    </div>
                </div>
            </TransitionLayout>
        </>
    )
}