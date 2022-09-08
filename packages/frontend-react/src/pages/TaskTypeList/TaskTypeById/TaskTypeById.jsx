import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskType from '../../../components/TaskType/TaskType.jsx';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import SidebarHeaderLayout from '../../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import { taskTypeApi } from '../../../services/TaskTypeService.js';

export default React.memo(function TaskTypeById() {
    return (
        <>
            <SidebarHeaderLayout>
                    <SettingLayout label='Шаблон'>
                        <TaskType/>
                    </SettingLayout>
            </SidebarHeaderLayout>
        </>
    )
})