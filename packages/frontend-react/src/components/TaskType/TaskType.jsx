import React, { useEffect, useState } from 'react';
import Input from '../Input/Input.jsx';
import { useFormik } from 'formik';
import TextArea from '../TextArea/TextArea.jsx';
import Select from '../Select/Select.jsx';
import SelectField from '../SelectField/SelectField.jsx';
import * as Yup from 'yup'
import { taskTypeApi } from '../../services/TaskTypeService.js';
import { rolesApi } from '../../services/RolesService.js'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRoleList } from '../../store/slices/rolesSlice.js';
import Button from '../Button/Button.jsx';

export default React.memo(function TaskType() {
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    const formik = useFormik({
        initialValues: {
            organization: '6315fbd3d50683eb579a29bc',
            title: '',// Стандартный заголовок req
            description: '',// Описание req
            executorRole: '',// ID роли, сотрудники которой должны выполнить задание, req
            controllerRole: '',// ID роли, сотрудники которой имеют право подтверждать выполнение задания req
            requiredTime: 60,
            //requiredTime: '',// Необходимое время для выполнения задачи (в минутах) 
            //linkedContent: '',
            //deadLineHours: '',
            priority: ''// Стандартный приоритет задачи (от 0 до 4 включительно)
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            if (editMode) {
                if (params.id === 'new') {
                    updateTaskType(values)
                } else {
                    postTaskType(values)
                    setEditMode(false)
                }
            } else {
                setEditMode(true)
            }
        }
    })
    const params = useParams()
    const [editMode, setEditMode] = useState(params.id === 'new' ? true : false)
    const [fetchPostTaskType, { isLoading, isFetching }] = taskTypeApi.usePostTaskTypeMutation()
    const [fetchGetTaskTypeById] = taskTypeApi.useLazyGetTaskTypeByIdQuery()
    const [fetchUpdateTaskType] = taskTypeApi.useUpdateTaskTypeMutation()
    async function getTaskTypeById(id) {
        const { data } = await fetchGetTaskTypeById(id)
        if (data.status === 200) {
            const values = data.message[0]
            formik.setFieldValue('title', values.title)
            formik.setFieldValue('description', values.description)
            formik.setFieldValue('priority', values.priority)
            formik.setFieldValue('executorRole', values.executorRole)
            formik.setFieldValue('controllerRole', values.controllerRole)
        }
    }
    async function postTaskType(values) {
        await fetchPostTaskType(values)
    }
    async function updateTaskType(values) {
        await fetchUpdateTaskType(values)
    }
    const roleListOptions = useSelector(selectRoleList)?.map(el => el && { label: el.title, value: el._id })
    const priorityOptions = [
        { label: 'Очень срочно', value: 4 },
        { label: 'Срочно', value: 3 },
        { label: 'Высокий', value: 2 },
        { label: 'Средний', value: 1 },
        { label: 'Низкий', value: 0 }
    ]
    useEffect(() => {
        if (params.id !== 'new') {
            getTaskTypeById(params.id)
        }
    }, [params.id])
    return (
        <>
            <div className="task-type__container" style={{ maxWidth: '400px' }}>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Input formik={formik} id='title' name='title' label='Заголовок' />
                    <div className="" style={{ display: 'flex', gap: 10 }}>
                        <Select formik={formik} id='executorRole' name='executorRole' label='Роль исполнителя' options={roleListOptions} hasDefaultValue={true} />
                        <Select formik={formik} id='controllerRole' name='controllerRole' label='Роль ответственного' options={roleListOptions} hasDefaultValue={true} />
                        {/* <Select formik={formik} id='linkedContent' name='linkedContent' label='Необходимо для завершения задачи'/> */}
                        <Select formik={formik} id='priority' name='priority' label='Степень важности' options={priorityOptions} hasDefaultValue={true} />
                    </div>
                    <TextArea formik={formik} id='description' name='description' label='Описание' />
                    <Button text={editMode ? params.id === 'new' ? 'Создать шаблон' : 'Сохранить' : 'Редактировать'} type='submit' color={editMode ? params.id === 'new' ? 'green' : 'green' : 'blue'} />
                </form>
            </div>
        </>
    )
})