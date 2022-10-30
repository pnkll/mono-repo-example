import { ResumableProvider, useTrackedResumable } from '@src/Providers/Resumable/ResumableContext';
import { selectNotifications } from '@store/slices/notificationsSlice';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import s from './NotifySection.module.scss'
import classNames from 'classnames/bind';
import Notification from '@components/Notification/Notification';

const cx = classNames.bind(s)

function NotifySectionWithProvider() {
    const commonNotificationsList = useSelector(selectNotifications)
    const [{resumables}]=useTrackedResumable()
    const visible = (!_.isEmpty(commonNotificationsList) || !_.isEmpty(resumables))
    return (
        <>
            <div className={cx({ ['notify__container']: true, empty: !visible })}>
                {commonNotificationsList.map((el: any) => <Notification key={el.id} id={el.id} type={el.type} message={el.message} />)}
                {/* {resumables.map(({ r }: any, index: number) => <UploadNotification key={index} id={index} resumable={r} />)} */}
            </div>
        </>
    )
}

export default function NotifySection(){
    return(
        <ResumableProvider>
            <NotifySectionWithProvider/>
        </ResumableProvider>
    )
}