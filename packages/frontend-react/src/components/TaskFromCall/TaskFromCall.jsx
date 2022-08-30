import React from 'react';
import { useFormik } from 'formik'
import Input from '../Input/Input.jsx'
import TextArea from '../TextArea/TextArea.jsx'
import DatePicker from '../DatePicker/DatePicker.jsx'
import Select from '../Select/Select.jsx';

export default React.memo(function TaskFromCall() {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            prioryti: '',
        },
        onSubmit: values => {
            console.log(values)
        }
    })
    return (
        <>
        <h1>Заявка #43267</h1>
            <form>
                <div className="" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Input formik={formik} placeholder='Заголовок' id='title' name='title' label='Заголовок'/>
                    <TextArea formik={formik} placeholder='Описание' id='description' name='description' rows={5} label='Описание'/>
                    <div className="" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <DatePicker formik={formik} id='time' name='time' placeholder='Время' timeIntervals={15} showTimeSelect={true}/>
                        <Select />
                    </div>

                </div>
            </form>
        </>
    )
})