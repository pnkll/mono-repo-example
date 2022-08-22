import React from 'react';
import Input from '../Input/Input.jsx';
import { useFormik } from 'formik';
import TextArea from '../TextArea/TextArea.jsx';
import Select from '../Select/Select.jsx';
import SelectField from '../SelectField/SelectField.jsx';
import * as Yup from 'yup'

export default React.memo(function TaskType() {
    const validationSchema = Yup.object().shape({
        title: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            role: { label: 'User', value: 'user' },
            deadLineHours: '',
            necessaryToComplete: '',
            importance: { label: 'Средний', value: 'middle' },
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
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
                    <Input formik={formik} label='Название' id='title' name='title' type='text' />
                    <TextArea formik={formik} label='Описание' id='description' name='description' rows={3} />
                    <SelectField options={roles} label='Какая роль выполняет' formik={formik} id='role' name='role' />
                    <Input formik={formik} label='Срок выполнения (часы)' id='deadLineHours' name='deadLineHours' type='number' />
                    <TextArea formik={formik} label='Что необходимо для завершения задачи' id='necessaryToComplete' name='necessaryToComplete' rows={3} />
                    <SelectField options={importance} label='Степень важности' formik={formik} id='importance' name='importance' />
                    <button type='submit'>Создать шаблон</button>
                </form>
            </div>
        </>
    )
})