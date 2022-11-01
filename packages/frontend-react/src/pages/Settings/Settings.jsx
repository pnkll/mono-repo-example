import SettingItem from '@components/SettingItem/SettingItem';
import { PencilIcon } from '@heroicons/react/outline';
import TwoColumnLayout from '@src/layouts/TwoColumnLayout/TwoColumnLayout';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import React from 'react';

export default function Settings() {

    const items = [
        { label: 'Роли', icon: <PencilIcon width={10} />, href: 'roles' },
        { label: 'Шаблоны задач', icon: <PencilIcon width={10} />, href: 'task-types' },
    ]

    return (
        <>
                <TransitionOverlay>
                    <TwoColumnLayout>
                        <SettingItem label='Главные' items={items} />
                    </TwoColumnLayout>
                </TransitionOverlay>
        </>
    )
}