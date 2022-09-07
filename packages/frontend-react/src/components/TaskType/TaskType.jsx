import React from 'react';
import Input from '../Input/Input.jsx';
import { useFormik } from 'formik';
import TextArea from '../TextArea/TextArea.jsx';
import Select from '../Select/Select.jsx';
import SelectField from '../SelectField/SelectField.jsx';
import * as Yup from 'yup'
import { taskTypeApi } from '../../services/TaskTypeService.js';
import { rolesApi } from '../../services/RolesService.js'

export default React.memo(function TaskType() {
    const [postTaskType, { isLoading, isFetching }] = taskTypeApi.usePostTaskTypeMutation()
    //TODO разобраться с тем как прокинуть isLoading
    const {data }=rolesApi.useGetRolesQuery()
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
            postTaskType(values)
        }
    })
    const roles = data?.message.map(el=>el&&{label: el.title, value: el._id})
    const priority = [
        { label: 'Очень срочно', value: 4 },
        { label: 'Срочно', value: 3 },
        { label: 'Высокий', value: 2 },
        { label: 'Средний', value: 1 },
        { label: 'Низкий', value: 0 }
    ]
    return (
        <>
            <div className="task-type__container" style={{ maxWidth: '400px' }}>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <Input formik={formik} id='title' name='title' label='Заголовок'/>
                    <TextArea formik={formik} id='description' name='description' label='Описание'/>
                    <Select formik={formik} id='executorRole' name='executorRole' label='Роль исполнителя' options={roles}/>
                    <Select formik={formik} id='controllerRole' name='controllerRole' label='Роль ответственного' options={roles}/>
                    {/* <Select formik={formik} id='linkedContent' name='linkedContent' label='Необходимо для завершения задачи'/> */}
                    <Select formik={formik} id='priority' name='priority' label='Степень важности' options={priority}/>
                    <button type='submit'>Создать шаблон</button>
                </form>
            </div>
        </>
    )
})