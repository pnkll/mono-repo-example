import { PencilIcon } from '@heroicons/react/outline';
import React from 'react';
import SettingItem from '../../components/SettingItem/SettingItem.jsx';
import TwoColumnLayout from '../../layouts/TwoColumnLayout/TwoColumnLayout.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx'
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';

export default React.memo(function Settings() {

    const items = [
        { label: 'Роли', icon: <PencilIcon width={10} />, href: 'roles' },
        { label: 'Шаблоны задач', icon: <PencilIcon width={10} />, href: 'task-types' },
    ]

    return (
        <>
                <TransitionLayout>
                    <TwoColumnLayout>
                        <SettingItem label='Главные' items={items} />
                    </TwoColumnLayout>
                </TransitionLayout>
        </>
    )
})