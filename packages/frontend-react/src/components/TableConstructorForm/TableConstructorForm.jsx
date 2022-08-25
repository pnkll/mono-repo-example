import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import Input from '../Input/Input.jsx'
import Select from '../Select/Select.jsx'
import ToggleInput from '../ToggleInput/ToggleInput.jsx'
import Button from '../Button/Button.jsx';
import { isNil } from 'lodash';
import * as Yup from 'yup'

export default React.memo(function TableConstructorForm({ removeHandler, index, type,data,setData,submitHandler, order }) {
    const currentForm = data.find(el=>el.id===order)
    const formik = useFormik({
        initialValues: {
            title: '',
            code: '',
            type: { label: 'string', value: 'string' },
            required: false,
            unique: false,
            toIndex: false,
        },
        validationSchema: Yup.object({
            title: Yup.string().required()
        }),
        onSubmit: values => {
            console.log(values)
        }
    })
    const optionsOfTypes = [
        { label: 'string', value: 'string' },
        { label: 'number', value: 'number' },
        { label: 'date', value: 'date' },
    ]
    useEffect(()=>{
        setData([...data, {id: order, isSubmit: false, values: formik.values}])
    },[])
    useEffect(()=>{
        if(currentForm?.isSubmit){
            formik.submitForm()
            setData(data.map(el=>el&&{...el,isSubmit:false}))
            }
    },[currentForm?.isSubmit&&currentForm.isSubmit])
    return (
        <>
            <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                <form onSubmit={(e) => { e.preventDefault(); formik.submitForm() }}>
                    <Input formik={formik} id='title' name='title' placeholder='title' />
                    <Input formik={formik} id='code' name='code' placeholder='code' />
                    <Select options={optionsOfTypes} id='type' name='type' defaultValue={formik.values.type} formik={formik} />
                    <ToggleInput formik={formik} id='required' name='required' label='is required' />
                    <ToggleInput formik={formik} id='unique' name='unique' label='is unique' />
                    <ToggleInput formik={formik} id='toIndex' name='toIndex' label='to index' />
                    <Button text='Удалить поле' handleClick={() =>removeHandler(index)} color='red'/>
                </form>
            </div>
        </>
    )
})