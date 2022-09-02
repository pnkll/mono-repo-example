import React from 'react';
import Input from '../Input/Input.jsx';
import { useFormik } from 'formik';
import TextArea from '../TextArea/TextArea.jsx';
import Select from '../Select/Select.jsx';
import SelectField from '../SelectField/SelectField.jsx';
import * as Yup from 'yup'
import { taskTypeApi } from '../../services/TaskTypeService.js';

export default React.memo(function TaskType() {
    const [postTaskType, { isLoading, isFetching }] = taskTypeApi.usePostTaskTypeMutation()
    const validationSchema = Yup.object().shape({
        title: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });
    const formik = useFormik({
        initialValues: {
            title: '',// Стандартный заголовок req
            description: '',// Описание req
            executorRole: '',// ID роли, сотрудники которой должны выполнить задание, req
            controllerRole: '',// ID роли, сотрудники которой имеют право подтверждать выполнение задания req
            requiredTime: '',// Необходимое время для выполнения задачи (в минутах) 
            linkedContent: '',
            deadLineHours: '',
            priority: ''// Стандартный приоритет задачи (от 0 до 4 включительно)
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            postTaskType(values)
        }
    })
    const roles = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ]
    const importance = [
        { label: 'Высокий', value: 'high' },
        { label: 'Средний', value: 'middle' },
        { label: 'Низкий', value: 'small' }
    ]
    return (
        <>
            <div className="task-type__container" style={{ maxWidth: '400px' }}>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <Input formik={formik} id='title' name='title' label='Заголовок'/>
                    <TextArea formik={formik} id='description' name='descrption' label='Описание'/>
                    <Select formik={formik} id='executorRole' name='executorRole' label='Роль исполнителя'/>
                    <Select formik={formik} id='controllerRole' name='controllerRole' label='Роль ответственного'/>
                    <Select formik={formik} id='linkedContent' name='linkedContent' label='Необходимо для завершения задачи'/>
                    <Select formik={formik} id='priority' name='priority' label='Степень важности'/>
                    <button type='submit'>Создать шаблон</button>
                </form>
            </div>
        </>
    )
})