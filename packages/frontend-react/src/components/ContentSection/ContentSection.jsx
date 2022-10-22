import _, { isNil } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import UploadProgressProvider, { UploadContext } from '../../Providers/UploadNotify';
import { selectNotifications } from '../../store/slices/notificationsSlice';
import CallWrapper from '../CallWrapper/CallWrapper';
import Notification from '../Notification/Notification';
import UploadNotification from '../UploadNotification/UploadNotification';

function ContentSectionWithProvider({ }) {
    const notificationsList = useSelector(selectNotifications)
    const [{resumables}, dispatch] = React.useContext(UploadContext)
    return (
        <>
            <div className="sidebar-header-layout__content">
                {(!_.isEmpty(notificationsList) || !_.isEmpty(resumables))
                    && <div className="sidebar-header-layout__content__notifications__wrapper">
                        {resumables.map(el => !isNil(el.status)
                            && <UploadNotification key={el.id} id={el.id} status={el.status} resumable={el.r} progress={el.progress} dispatch={dispatch} />)}
                        {!_.isEmpty(notificationsList) && notificationsList.map(el => <Notification key={el.id} id={el.id} type={el.type} message={el.message} />)}
                    </div>}
                <Outlet />
                <CallWrapper />
            </div>
        </>
    )
}

export default function ContentSection({}) {
    return (
        <UploadProgressProvider >
            <ContentSectionWithProvider />
        </UploadProgressProvider >)
}