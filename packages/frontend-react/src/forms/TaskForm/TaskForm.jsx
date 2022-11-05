import { Formik } from 'formik'
import Input from '@components/Input/Input'
import s from './TaskForm.module.scss'
import TextArea from '@components/UiKit/TextArea/TextArea'
import Button from '@components/Button/Button'
import PrioritySelector from '@components/PrioritySelector/PrioritySelector'
import { taskApi } from '@services/TaskService'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@store/slices/userSlice'

export default function TaskForm() {
    const initialValues = {
        title: '',
        description: '',
        executorRole: '63627d2dabef6f63c1a5d305',
        controllerRole: '63627d2dabef6f63c1a5d305',
        requiredTime: '',
        priority: '',
        //ai_assigned: false,
        desiredDate: '',
        fireDate: '',
        linkedContent: ''
    }
    const [postTask]=taskApi.useCreateTaskMutation()
    const org_id=useSelector(selectCurrentUser)?.org_id
    function handleSubmit(e){
        const data = Object.entries(e).reduce((a,[k,v]) => (v===''? a : (a[k]=v, a)), {})
        postTask({...data,org_id})
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {formik => (
                    <form onSubmit={(e)=>{e.preventDefault();formik.handleSubmit()}}>
                        <Input id='title' name='title' formik={formik} label='title'/>
                        <TextArea formik={formik} id='description' label='desc'/>
                        <PrioritySelector id='priority' name='priority' formik={formik} label='priority'/>
                        <Button type='submit' text='Создать'/>
                    </form>
                )}
            </Formik>
        </>
    )
}