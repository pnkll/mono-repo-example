import NotifySection from '@components/NotifySection/NotifySection';
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
    const [{ resumables }, dispatch] = useTrackedResumable()
    console.log(resumables)
    return (
        <>
            <section className={s["content__container"]}>
                <NotifySection/>
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