import { isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { taskApi } from '@services/TaskService';
import { taskTypeApi } from '@services/TaskTypeService';
//import TaskForm from '@forms/Task/TaskForm';
import PreloaderForPage from '@components/PreloaderForPage/PreloaderForPage';
import ErrorForPage from '@components/ErrorForPage/ErrorForPage';
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay';
import PrimaryCalendar from '@components/UiKit/Calendar/PrimaryCalendar/PrimaryCalendar';
import TaskControlPanel from '@components/TaskControlPanel/TaskControlPanel';
import { withTransition } from '@src/hocs/withTransition/withTransition';
import TaskForm from '@forms/TaskForm/TaskForm';
import { MenuIcon } from '@heroicons/react/solid';
import TaskEditSection from '@components/TaskEditSection/TaskEditSection';
import { useTransition, animated } from 'react-spring';
import React from 'react'

function TaskById() {
    const params = useParams()
    const isNew = isNil(params.id)
    const [getTask, { data: task, isLoading, isFetching, isError, isSuccess }] = taskApi.useLazyGetTaskByIdQuery()
    //const [getTaskType, { data: taskType, isLoading: isLoadingTaskType, isError: isErrorTaskType, isSuccess: isSuccessTaskType }] = taskTypeApi.useLazyGetTaskTypeByIdQuery()
    React.useEffect(() => {
        !isNew && getTask(params.id)
    }, [params])
    const [isVisible, setIsVisible] = React.useState(false)

    // useEffect(() => {
    //     if (isSuccess) {
    //         getTaskType(task.taskType)
    //     }
    // }, [isSuccess])

    if (isLoading
        // || isLoadingTaskType
    ) {
        return <PreloaderForPage />
    }

    if (isError
        //|| isErrorTaskType
    ) {
        return <ErrorForPage />
    }
    return (
        <>
            {isSuccess &&
                <ContentItemOverlay label='Задача'>
                    <div className="" style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <TaskForm isNew={isNew} task={task}
                            //taskType={taskType} 
                            isFetching={isFetching} id={params.id} />
                            <TaskEditSection isVisible={isVisible}/>
                        <MenuIcon width='24' onClick={()=>setIsVisible((v)=>!v)}/>
                    </div>
                </ContentItemOverlay>
            }
        </>
    )
}

export default TaskById = withTransition(TaskById, 'TaskById')