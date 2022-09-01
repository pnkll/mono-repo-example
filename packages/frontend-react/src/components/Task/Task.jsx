import { useFormik } from 'formik';
import React from 'react';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import './Task.scss'

export default React.memo(function Task(){
    const formik = useFormik({
        initialValues:{
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
   return(
       <>
       <CardLayout title={'Заявка'}>
        <Select options={[{value:1,label:1}]} label='Task type'/>
        <form>
            <Input formik={formik} id='comment' name='comment' label='comment'/>
            <DatePicker formik={formik} id='needDate' name='needDate' label='Желаемая дата'/>
            <Select formik={formik} id='performer' name='performer' label='Исполнитель'/>
            <DatePicker formik={formik} id='date' name='date' placeholder='Время' label='Дата' showTimeSelect={true}/>
            <Select formik={formik} id='priority' name='priority' label='Приоритет'/>
        </form>
       </CardLayout>
       </>
   )
})