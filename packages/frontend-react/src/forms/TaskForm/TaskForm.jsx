import { Formik } from 'formik'
import Input from '@components/Input/Input'
import s from './TaskForm.module.scss'
import TextArea from '@components/UiKit/TextArea/TextArea'
import Button from '@components/Button/Button'
import PrioritySelector from '@components/PrioritySelector/PrioritySelector'
import { taskApi } from '@services/TaskService'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@store/slices/userSlice'
import RoleSelector from '@components/RoleSelector/RoleSelector'

export default function TaskForm({task,isNew}) {
    const initialValues = {
        AI_assigned: task.AI_assigned,
        controllerRole: task.controllerRole,
        createdAt: task.createdAt,
        description: task.description,
        executor: task.executor,
        executorRole: task.executorRole,
        linkedContent: task.linkedContent,
        org_id: task.org_id,
        priority: task.priority,
        status: task.status,
        title: task.title,
        updatedAt: task.updatedAt,
    }
    const [postTask] = taskApi.useCreateTaskMutation()
    //const org_id = useSelector(selectCurrentUser)?.org_id
    function handleSubmit(e) {
        const data = Object.entries(e).reduce((a, [k, v]) => (v === '' ? a : (a[k] = v, a)), {})
        postTask({ data })
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {formik => (
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                        <Input id='title' name='title' formik={formik} label='title' />
                        <TextArea formik={formik} id='description' label='description' />
                        <PrioritySelector id='priority' name='priority' formik={formik} label='priority' defaultValue={true}/>
                        <Input id='status' name='status' formik={formik} label='status'/>
                        <RoleSelector formik={formik} id='executorRole' name='executorRole' label='executorRole' defaultValue={true}/>
                        <RoleSelector formik={formik} id='controllerRole' name='controllerRole' label='controllerRole' defaultValue={true}/>
                        <Button type='submit' text='Создать' />
                    </form>
                )}
            </Formik>
        </>
    )
}