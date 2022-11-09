import { taskApi } from '@services/TaskService'
import { TaskAdditional } from '@src/entities/role/task/TaskAdditional/index'
import TaskCard from '@src/entities/role/task/TaskCard/ui/TaskCard'
import { TaskControl } from '@src/entities/role/task/TaskControl/index'
import { withTransition } from '@src/hocs/withTransition/withTransition'
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay'
import { useParams } from 'react-router-dom'
import s from './TaskDetailsPage.module.scss'

function TaskDetailsPage() {
    const { id } = useParams()
    const { data: taskDetails, isFetching } = taskApi.useGetTaskByIdQuery(id)
    return (
        <>
            <ContentItemOverlay label={`Задача ${taskDetails?.title}`}>
                <div className={s.container}>
                    <div className={s['left-section']}>
                        <TaskCard
                            data={taskDetails}
                            isLoading={isFetching}
                        />
                        <TaskControl />
                    </div>
                    <div className={s['right-section']}>
                        <TaskAdditional 
                            data={taskDetails} 
                            isLoading={isFetching}/>
                    </div>
                </div>
            </ContentItemOverlay>
        </>
    )
}

export default withTransition(TaskDetailsPage, 'TaskDetailsPage', 'right')