import React from 'react';
import ProfileForm from '../../forms/ProfileForm/ProfileForm.jsx';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';

export default function Profile() {
    return (
        <>
                <TransitionLayout>
                    <CardLayout title={'Сотрудник'}>
                        <ProfileForm />
                    </CardLayout>
                </TransitionLayout>
        </>
    )
}