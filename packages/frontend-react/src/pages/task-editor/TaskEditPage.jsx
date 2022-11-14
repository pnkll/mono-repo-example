import PreloaderForPage from '@components/PreloaderForPage/PreloaderForPage'
import { taskApi } from '@services/TaskService'
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay'
import { TaskEditCard } from '@src/widgets/task/TaskEditCard/index'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './TaskEditPage.module.scss'

export default function TaskEditPage() {
    const { id } = useParams()
    const navigate=useNavigate()
    const { data: task, isSuccess, isFetching } = taskApi.useGetTaskByIdQuery(id)
    const [updateTask,{isSuccess:isSuccessUpdate}]=taskApi.useUpdateTaskMutation()
    useEffect(()=>{
        isSuccessUpdate&&navigate(`../tasks/${id}`)
    },[isSuccessUpdate])
    if (isFetching) {
        return <PreloaderForPage />
    }
    return (
        <>
            <ContentItemOverlay label={`Редактирование задачи ${task.title}`}>
                <div className={s.container}>
                    <TaskEditCard data={task} api={updateTask}/>
                </div>
            </ContentItemOverlay>
        </>
    )
}