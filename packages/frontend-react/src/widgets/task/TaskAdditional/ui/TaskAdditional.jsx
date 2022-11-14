import { taskApi } from '@services/TaskService'
import { PrioritySelector } from '@src/features/entities/priority/PrioritySelector/index'
import { RoleSelector } from '@src/features/entities/role/RoleSelector/index'
import TaskDateEditableItem from '@src/features/entities/task/TaskDateEditableItem/ui/TaskDateEditableItem'
import { TaskEditableItem } from '@src/features/entities/task/TaskEditableItem/index'
import { TaskExecutorAssign } from '@src/features/entities/task/TaskExecutorAssign/index'
import { UsersSelector } from '@src/features/entities/user/UsersSelector/index'
import { DatePicker } from '@src/shared/UiKit/DatePicker/index'
import { Item } from '@src/shared/UiKit/Descriptions/index'
import s from './TaskAdditional.module.scss'

export default function TaskAdditional({ data, isLoading }) {
    if (isLoading) {
        return <>preloader</>
    }
    return (
        <>
            <div className={s.container}>
                <Item 
                label='Создана'
                style={{justifyContent: 'space-between'}}>
                    <DatePicker readOnly={true} value={data.createdAt} />
                </Item>
                <TaskDateEditableItem
                    label='Крайний срок'
                    value={data.fireDate?.ISODate}
                    api={taskApi.useSetTaskFireDateMutation} />
                <TaskDateEditableItem
                    label='Желаемая дата'
                    value={data.desiredDate?.ISODate}
                    api={taskApi.useSetTaskDesiredDateMutation}
                    placeholderText='Не установлена'
                />
                <TaskEditableItem
                    label='Роль ответственного'
                    value={data.controllerRole}
                    api={taskApi.useSetControllerRoleMutation}
                    name='controllerRole'>
                    <RoleSelector />
                </TaskEditableItem>
                <TaskEditableItem
                    label='Роль исполнителя'
                    value={data.executorRole}
                    api={taskApi.useSetExecutorRoleMutation}
                    name='executorRole'>
                    <RoleSelector />
                </TaskEditableItem>
                <TaskEditableItem
                    label='Приоритет'
                    value={data.priority}
                    api={taskApi.useSetTaskPriorityMutation}
                    name='priority'>
                    <PrioritySelector />
                </TaskEditableItem>
                <TaskExecutorAssign
                    data={data}
                    label='Исполнитель'
                />
            </div>
        </>
    )
}