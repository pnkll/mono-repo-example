import ProfileForm from '@forms/ProfileForm/ProfileForm';
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import React from 'react';

export default function Profile() {
    return (
        <>
            <TransitionOverlay>
                <ContentItemOverlay lable='Сотрудник'>
                    <ProfileForm />
                </ContentItemOverlay>
            </TransitionOverlay>
        </>
    )
}