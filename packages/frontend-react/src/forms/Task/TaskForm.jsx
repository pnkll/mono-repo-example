import { Formik } from 'formik';
import React from 'react';
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';
import DatePicker from '../../components/DatePicker/DatePicker'
import Select from '../../components/Select/Select'
import { priorityOptions } from '../../helpers/forTask';
import Button from '../../components/Button/Button';
import {taskApi} from '../../services/TaskService'

export default function TaskForm({ isNew, task, isFetching, id }) {
    const [updateTask]=taskApi.useUpdateTaskMutation()
    const initialValues = React.useMemo(() =>
        isNew
            ? {
                title: '',
                description: '',
                // createdAt: '',
                // updatedAt: '',
                priority: '',
            }
            : {
                title: task.title,
                description: task.description,
                // createdAt: '',
                // updatedAt: new Date(task.updatedAt),
                priority: task.priority,
            }, [isNew])     
            function handleSubmit(values){
                updateTask({...values, _id: id})
            }
    if (isFetching) {
        return <>Preloader</>
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {formik => (
                    <form onSubmit={(e)=>{e.preventDefault();formik.handleSubmit()}}>
                        <Input id='title' name='title' formik={formik} />
                        <TextArea id='description' name='description' formik={formik}/>
                        {/* <DatePicker id='createdAt' name='createdAt' formik={formik}/>
                        <DatePicker id='updatedAt' name='updatedAt' formik={formik}/> */}
                        <Select options={priorityOptions} id='priority' name='priority' formik={formik} defaultValue={isNew?false:true}/>
                        <Button text='Сохранить' type='submit'/>
                    </form>
                )}
            </Formik>
        </>
    )
}