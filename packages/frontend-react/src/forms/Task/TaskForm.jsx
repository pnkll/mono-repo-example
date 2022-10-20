import { Formik } from 'formik';
import React from 'react';
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';
import DatePicker from '../../components/DatePicker/DatePicker'
import Select from '../../components/Select/Select'
import { priorityOptions } from '../../helpers/forTask';
import Button from '../../components/Button/Button';
import { taskApi } from '../../services/TaskService'
import PreloaderForPage from '../../components/PreloaderForPage/PreloaderForPage';
import ErrorForPage from '../../components/ErrorForPage/ErrorForPage';
import { usersApi } from '../../services/UsersService';
import UserSelectorbyRole from '../../components/UserSelectorByRole/UserSelectorByRole';

export default function TaskForm({ isNew, task, isFetching, id, isError, taskType }) {
    const [editMode, setEditMode] = React.useState(isNew)
    const [updateTask] = taskApi.useUpdateTaskMutation()
    const initialValues = React.useMemo(() =>
        isNew
            ? {
                title: '',
                description: '',
                priority: '',
            }
            : {
                title: task.title,
                description: task.description,
                status: task.status,
                executor: task.executor,
                taskTypeTitle: taskType.title,
                priority: task.priority,
            }, [isNew])
    function handleSubmit(values) {
        if(editMode){
            updateTask({ ...values, _id: id })
        }
        setEditMode(true)
    }
    if (isFetching) {
        return <PreloaderForPage />
    }
    else if (isError) {
        return <ErrorForPage />
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {formik => (
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                        <Input id='title' name='title' formik={formik} label='Название задачи' readonly={editMode ? false : true} />
                        <Input id='taskTypeTitle' name='taskTypeTitle' formik={formik} label='Тип задачи' readonly={editMode ? false : true} />
                        <Input id='status' name='status' formik={formik} label='Статус задачи' readonly={editMode ? false : true} />
                        <UserSelectorbyRole id='executor' formik={formik} label='Исполнитель' roleId={taskType.executorRole} name='executor' defaultValue={true} />
                        {/* <Select id='executor' name='executor' formik={formik} label='Иполнитель' options={executorOptions} defaultValue={true}/> */}
                        <TextArea id='description' name='description' formik={formik} label='Описание задачи' readonly={editMode ? false : true} />
                        <Select options={priorityOptions} id='priority' name='priority' formik={formik} defaultValue={isNew ? false : true} label='Приоритет' readonly={editMode ? false : true} />
                        <Button text={editMode ? 'Сохранить' : 'Редактировать'} type='submit' />
                    </form>
                )}
            </Formik>
        </>
    )
}