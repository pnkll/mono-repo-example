import s from './TaskCreate.module.scss'
import ContentItemOverlay from  '@src/overlays/ContentItemOverlay/ContentItemOverlay'
import TaskForm from '@forms/TaskForm/TaskForm'

export default function TaskCreate() {

    return (
        <>
            <ContentItemOverlay label='Новая задача'>
                <TaskForm/>
            </ContentItemOverlay>
        </>
    )
}