import React, { useEffect, useState } from 'react';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import ProfileForm from "../../forms/ProfileForm.jsx";
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