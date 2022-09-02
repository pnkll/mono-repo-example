import { useFormik } from 'formik';
import React from 'react';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import TextArea from '../TextArea/TextArea.jsx';
import './Task.scss'

export default React.memo(function Task() {
    const formik = useFormik({
        initialValues: {
            taskType: '',
            comment: '',
            needTime: '',
            lastTime: '',
            time: '',
            attachData: '',
            executor: '',
            status: '',
            priority: ''
        },
    })
    return (
        <>
            <CardLayout title={'Заявка'}>
                <Select options={[{ value: 1, label: 1 }]} label='Task type' />
                <form>
                    <TextArea formik={formik} label={'Описание'} id='comment' name='comment' />
                    <div className="" style={{ display: 'flex', gap: 10,justifyContent: 'center', padding: '10px' }}><DatePicker placeholder={'Желаемая дата'} formik={formik} id='needTime' name='needTime' />
                        <DatePicker placeholder={'Крайний срок'} formik={formik} id='lastTime' name='lastTime' />
                        <DatePicker placeholder={'Назначенная дата'} formik={formik} id='time' name='time' /></div>
                    <Select formik={formik} label={'Исполнитель'} id='executor' name='executor' />
                    <Select formik={formik} id='status' name='status' label='Статус заявки' />
                    <Select formik={formik} id='priority' name='priority' label='Степень важности' />
                </form>
            </CardLayout>
        </>
    )
})