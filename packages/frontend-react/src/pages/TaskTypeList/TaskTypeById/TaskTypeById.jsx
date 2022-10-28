import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PreloaderForPage from '../../../components/PreloaderForPage/PreloaderForPage.jsx';
import ErrorForPage from '../../../components/ErrorForPage/ErrorForPage'
import TaskTypeForm from '../../../forms/TaskTypeForm/TaskTypeForm.jsx';
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout.jsx';
import { taskTypeApi } from '../../../services/TaskTypeService.js';

export default function TaskTypeById() {
    const params = useParams()
    const isNew = params.id ? false : true
    const [getTaskTypeById, { data: taskType, isFetching, isError, isSuccess }] = taskTypeApi.useLazyGetTaskTypeByIdQuery()
    React.useLayoutEffect(() => {
        !isNew && getTaskTypeById(params.id)
    }, [])
    if (isFetching) {
        return <PreloaderForPage />
    }
    if (isError) {
        return <ErrorForPage />
    }
    return (
        <>{(isNew ? true : isSuccess) &&
            <SettingLayout label='Шаблон'>
                <TaskTypeForm data={taskType} isNew={isNew} />
            </SettingLayout>
        }
        </>
    )
}