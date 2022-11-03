import { ResumableProvider, useTrackedResumable, useTrackedResumableState } from '@src/Providers/Resumable/ResumableContext';
import { selectNotifications } from '@store/slices/notificationsSlice';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import s from './NotifySection.module.scss'
import classNames from 'classnames/bind';
import Notification from '@components/Notification/Notification';
import ResumableProgress from '@components/ResumableProgress/ResumableProgress';

const cx = classNames.bind(s)

export default function NotifySection() {
    const commonNotificationsList = useSelector(selectNotifications)
    const {resumables,notifications}=useTrackedResumableState()
    const visible = (!_.isEmpty(commonNotificationsList) || !_.isEmpty(resumables))
    return (
        <>
            <div className={cx({ ['notify__container']: true, empty: !visible })}>
                {commonNotificationsList.map((el) => <Notification key={el.id} id={el.id} type={el.type} message={el.message} />)}
                {notifications.map((el)=><ResumableProgress key={el.id} id={el.id} notify={el}/>)}
            </div>
        </>
    )
}
