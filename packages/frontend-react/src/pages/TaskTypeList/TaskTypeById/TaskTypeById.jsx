import React, { useState } from 'react';
import TaskType from '../../../forms/TaskType/TaskType.jsx';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';

export default function TaskTypeById() {
    return (
        <>
                    <SettingLayout label='Шаблон'>
                        <TaskType/>
                    </SettingLayout>
        </>
    )
}