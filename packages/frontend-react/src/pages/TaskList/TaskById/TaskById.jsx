import { isNil } from 'lodash';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { taskApi } from '@services/TaskService';
import { taskTypeApi } from '@services/TaskTypeService';
import TaskForm from '@forms/Task/TaskForm';
import PreloaderForPage from '@components/PreloaderForPage/PreloaderForPage';
import ErrorForPage from '@components/ErrorForPage/ErrorForPage';
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay';
import PrimaryCalendar from '@components/UiKit/Calendar/PrimaryCalendar/PrimaryCalendar';
import TaskControlPanel from '@components/TaskControlPanel/TaskControlPanel';

export default function TaskById() {
    const params = useParams()
    const isNew = isNil(params.id)
    const [getTask, { data: task, isLoading, isFetching, isError, isSuccess }] = taskApi.useLazyGetTaskByIdQuery()
    const [getTaskType, { data: taskType, isLoading: isLoadingTaskType, isError: isErrorTaskType, isSuccess: isSuccessTaskType }] = taskTypeApi.useLazyGetTaskTypeByIdQuery()
    useEffect(() => {
        !isNew && getTask(params.id)
    }, [params])

    useEffect(() => {
        if (isSuccess) {
            getTaskType(task.taskType)
        }
    }, [isSuccess])

    if (isLoading || isLoadingTaskType) {
        return <PreloaderForPage />
    }

    if (isError || isErrorTaskType) {
        return <ErrorForPage />
    }
    return (
        <>
            {isSuccess && isSuccessTaskType && <TransitionOverlay>
                <ContentItemOverlay label='Задача'>
                    <TaskForm isNew={isNew} task={task} taskType={taskType} isFetching={isFetching} id={params.id} />
                </ContentItemOverlay>
            </TransitionOverlay>}
        </>
    )
}