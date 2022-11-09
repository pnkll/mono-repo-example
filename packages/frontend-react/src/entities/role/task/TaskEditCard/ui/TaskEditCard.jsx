import Button from '@components/Button/Button'
import { taskApi } from '@services/TaskService'
import { PrioritySelectorWIthLabel } from '@src/features/entities/priority/PrioritySelector/index'
import { RoleSelectorWithLabel } from '@src/features/entities/role/RoleSelector/index'
import { UsersSelectorWithLabel } from '@src/features/entities/user/UsersSelector/index'
import DatePickerWithLabel from '@src/shared/UiKit/DatePicker/ui/DatePickerWIthLabel/DatePickerWithLabel'
import { InputWithLabel } from '@src/shared/UiKit/Input/index'
import { TextAreaWithLabel } from '@src/shared/UiKit/TextArea/index'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import s from './TaskEditCard.module.scss'
import React from 'react'

export default function TaskEditCard({ data,api }) {
    const navigate = useNavigate()
    // const [updateTask, { isSuccess }] = taskApi.useUpdateTaskMutation()
    const initialValues = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        executor: data.executor,
        executorRole: data.executorRole,
        controller: data.controller,
        controllerRole: data.controllerRole,
        fireDate: data.fireDate?.ISODate,
        desiredDate: data.desireDate?.ISODate,
        plannedDate: data.plannedDate?.ISODate,
    }
    async function handleSubmit(values) {
        const body = {
            ...values,
            taskId: data._id,
            // org_id: data.org_id,
            fireDate: { autoFormat: values.fireDate },
            desiredDate: { autoFormat: values.desiredDate },
            plannedDate: { autoFormat: values.plannedDate },
        }
        !values.fireDate && delete body.fireDate
        !values.desiredDate && delete body.desiredDate
        !values.plannedDate && delete body.plannedDate
        api(body)
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({ handleChange, submitForm, setFieldValue, values, errors, touched, dirty, resetForm, handleSubmit }) => (
                    <form className={s.container} onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <InputWithLabel label='Заголовок' name='title' value={values.title} errors={errors.title} touched={touched.title} onChange={handleChange} />
                        <TextAreaWithLabel label='Описание' name='description' value={values.description} errors={errors.description} touched={touched.description} onChange={handleChange} />
                        <PrioritySelectorWIthLabel label='Приоритет' name='priority' value={values.priority} errors={errors.priority} touched={touched.priority} setFieldValue={setFieldValue} />
                        <RoleSelectorWithLabel label='Роль исполнителя' name='executorRole' value={values.executorRole} errors={errors.executorRole} touched={touched.executorRole} setFieldValue={setFieldValue} />
                        <UsersSelectorWithLabel label='Исполнитель' name='executor' roleId={values.executorRole} value={values.executor} errors={errors.executor} touched={touched.executor} setFieldValue={setFieldValue} />
                        <RoleSelectorWithLabel label='Роль ответственного' name='controllerRole' value={values.controllerRole} errors={errors.controllerRole} touched={touched.controllerRole} setFieldValue={setFieldValue} />
                        <UsersSelectorWithLabel label='Ответственный' name='controller' roleId={values.controllerRole} value={values.controller} errors={errors.controller} touched={touched.controller} setFieldValue={setFieldValue} />
                        <DatePickerWithLabel label='Крайний срок' name='fireDate' value={values.fireDate} errors={values.fireDate} touched={touched.fireDate} setFieldValue={setFieldValue} />
                        <DatePickerWithLabel label='Желаемая дата' name='desiredDate' value={values.desiredDate} errors={values.desiredDate} touched={touched.desiredDate} setFieldValue={setFieldValue} />
                        <DatePickerWithLabel label='Запланированная дата' name='plannedDate' value={values.plannedDate} errors={values.plannedDate} touched={touched.plannedDate} setFieldValue={setFieldValue} />
                        <Button text='Применить' type='submit' color='green' disabled={!dirty} />
                        <Button text='Сбросить изменения' color='white' handleClick={resetForm} disabled={!dirty} />
                        <Button text='Вернуться' color='white' handleClick={() => navigate(-1)} />
                    </form>
                )}
            </Formik>
        </>
    )
}