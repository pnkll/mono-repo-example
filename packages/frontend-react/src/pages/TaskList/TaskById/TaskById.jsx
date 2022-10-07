import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { taskApi } from '../../../services/TaskService'
import TransitionLayout from '../../../page_layouts/TransitionLayout/TransitionLayout'
import PreloaderForPage from '../../../components/PreloaderForPage/PreloaderForPage'
import ErrorForPage from '../../../components/ErrorForPage/ErrorForPage'
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout';
import TaskForm from '../../../forms/Task/TaskForm';

export default function Task() {
    const params = useParams()
    const isNew = isNil(params.id)
    const [getTask, { data: task, isLoading, isFetching, isError, isSuccess }] = taskApi.useLazyGetTaskByIdQuery()
    useEffect(() => {
        !isNew && getTask(params.id)
    }, [params])


    if (isLoading) {
        return <PreloaderForPage />
    }

    if (isError) {
        return <ErrorForPage />
    }
    return (
        <>
            {isSuccess && <TransitionLayout>
                <SettingLayout label='Задача'>
                        <TaskForm isNew={isNew} task={task} isFetching={isFetching} id={params.id} />
                </SettingLayout>
            </TransitionLayout>}
        </>
    )
}