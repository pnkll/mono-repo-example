import React, { useState } from 'react';
import Role from '../../../components/Role/Role.jsx';
import TaskType from '../../../components/TaskType/TaskType.jsx';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import SidebarHeaderLayout from '../../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';

export default React.memo(function TaskTypeById() {
    const [taskLayout, setTaskLayout] = useState({
        title: '',
        description: '',
        role: '',
        deadLineHours: '',
        importance: '',
        necessaryToComplete: ''
    })
    const [titleEditMode, setTitleEditMode] = useState(false)
    const handleChange = (field, value) => {
        setTaskLayout({ ...taskLayout, [field]: value })
    }
    return (
        <>
            <SidebarHeaderLayout>
                    <SettingLayout label='Task type'>
                        <TaskType />
                    </SettingLayout>
            </SidebarHeaderLayout>
        </>
    )
})