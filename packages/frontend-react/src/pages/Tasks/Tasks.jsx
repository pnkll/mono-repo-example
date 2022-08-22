import React, { useState } from 'react';
import TaskType from '../../components/TaskType/TaskType.jsx';
import HeaderLayout from '../../page_layouts/HeaderLayout/HeaderLayout.jsx';

export default React.memo(function Tasks() {
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
            <HeaderLayout>
                <TaskType />
            </HeaderLayout>
        </>
    )
})