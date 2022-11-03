import NotifySection from '@components/NotifySection/NotifySection';
import _, { isNil } from 'lodash';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ResumableProvider, useTrackedResumable } from '@src/Providers/Resumable/ResumableContext';
import CallWrapper from '../CallWrapper/CallWrapper';
import s from './ContentSection.module.scss'

function ContentSectionWithProvider({ }) {
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