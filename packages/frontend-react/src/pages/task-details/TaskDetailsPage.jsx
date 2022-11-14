import { taskApi } from '@services/TaskService'
import { TaskAdditional } from '@src/widgets/task/TaskAdditional/index'
import { TaskControl } from '@src/widgets/task/TaskControl/index'
import { withTransition } from '@src/hocs/withTransition/withTransition'
import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay'
import { useParams } from 'react-router-dom'
import TaskCard from '@src/widgets/task/TaskCard/ui/TaskCard'
import s from './TaskDetailsPage.module.scss'

function TaskDetailsPage() {
    const { id } = useParams()
    const { data: taskDetails, isLoading } = taskApi.useGetTaskByIdQuery(id)
    return (
        <>
            <ContentItemOverlay label={`Задача ${taskDetails?.title}`}>
                <div className={s.container}>
                    <div className={s['left-section']}>
                        <TaskCard
                            data={taskDetails}
                            isLoading={isLoading}
                        />
                        <TaskControl />
                    </div>
                    <div className={s['right-section']}>
                        <TaskAdditional 
                            data={taskDetails} 
                            isLoading={isLoading}/>
                    </div>
                </div>
            </ContentItemOverlay>
        </>
    )
}

export default withTransition(TaskDetailsPage, 'TaskDetailsPage', 'right')