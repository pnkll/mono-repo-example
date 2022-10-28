import _, { isNil } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ResumableProvider, useTrackedResumable } from '../../Providers/Resumable/ResumableContext';
import UploadProgressProvider, { UploadContext } from '../../Providers/UploadNotify';
import { selectNotifications } from '../../store/slices/notificationsSlice';
import CallWrapper from '../CallWrapper/CallWrapper';
import Notification from '../Notification/Notification';
import UploadNotification from '../UploadNotification/UploadNotification';
import s from './ContentSection.module.scss'

function ContentSectionWithProvider({ }) {
    const notificationsList = useSelector(selectNotifications)
    //const [{ resumables }, dispatch] = React.useContext(UploadContext)
    const [{resumables},dispatch]=useTrackedResumable()
    console.log(resumables)
    return (
        <>
            <section className={s["content__container"]}>
                {(!_.isEmpty(notificationsList) || !_.isEmpty(resumables))
                    && <div className={s["content__notifications__wrapper"]}>
                        {/* {resumables.map(el => !isNil(el.status)
                            && <UploadNotification key={el.id} id={el.id} status={el.status} resumable={el.r} progress={el.progress} dispatch={dispatch} />)} */}
                        {!_.isEmpty(notificationsList) && notificationsList.map(el => <Notification key={el.id} id={el.id} type={el.type} message={el.message} />)}
                        {resumables.map(({r},index) => <UploadNotification key={index} id={index} resumable={r} />)}
                    </div>}
                <Outlet />
                <CallWrapper />
            </section>
        </>
    )
}

export default function ContentSection({ }) {
    return (
            <ResumableProvider>
                <ContentSectionWithProvider />
            </ResumableProvider>
            )
}