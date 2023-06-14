import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { taskApi } from '../../../services/TaskService'
import { taskTypeApi } from '../../../services/TaskTypeService'
import TransitionLayout from '../../../page_layouts/TransitionLayout/TransitionLayout'
import PreloaderForPage from '../../../components/PreloaderForPage/PreloaderForPage'
import ErrorForPage from '../../../components/ErrorForPage/ErrorForPage'
import SettingLayout from '../../../layouts/SettingLayout/SettingLayout';
import TaskForm from '../../../forms/Task/TaskForm';
import { usersApi } from '../../../services/UsersService';
import { rolesApi } from '../../../services/RolesService';

export default function TaskById() {
    const params = useParams()
    const isNew = isNil(params.id)
    const [getTask, { data: task, isLoading, isFetching, isError, isSuccess }] = taskApi.useLazyGetTaskByIdQuery()
    const [getTaskType, {data: taskType, isLoading: isLoadingTaskType, isError: isErrorTaskType, isSuccess: isSuccessTaskType}]=taskTypeApi.useLazyGetTaskTypeByIdQuery()
    useEffect(() => {
        !isNew && getTask(params.id)
    }, [params])

    useEffect(()=>{
        if(isSuccess){
            getTaskType(task.taskType)
        }
    },[isSuccess])

    if (isLoading||isLoadingTaskType) {
        return <PreloaderForPage />
    }

    if (isError||isErrorTaskType) {
        return <ErrorForPage />
    }
    return (
        <>
            {isSuccess&&isSuccessTaskType && <TransitionLayout>
                <SettingLayout label='Задача'>
                        <TaskForm isNew={isNew} task={task} taskType={taskType} isFetching={isFetching} id={params.id} />
                </SettingLayout>
            </TransitionLayout>}
        </>
    )
}