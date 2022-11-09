import FileInput from "../../components/FileInput/FileInput.jsx";
import DragNDropInput from "../../components/DragNDropInput/DragNDropInput.jsx";
import TransitionOverlay from "@src/overlays/TransitionOverlay/TransitionOverlay";
import React from 'react'
import Button from "@components/Button/Button";
import Select from "@src/shared/UiKit/Select/ui/primary/Select";
import { Formik } from "formik";
import { priorityOptions } from "@src/helpers/forTask";
import Input from "@src/shared/UiKit/Input/ui/Input";
import s from './Main.module.scss'
import DatePicker from "@src/shared/UiKit/DatePicker/ui/DatePicker";
import DatePickerWithLabel from "@src/shared/UiKit/DatePicker/ui/DatePickerWIthLabel/DatePickerWithLabel";
import { TextArea } from "@src/shared/UiKit/TextArea/index";
import * as Yup from 'yup'


export default function Main() {

    const ref=React.useRef()

    const validationSchema = Yup.object({
        desc: Yup.string().required()
    })

    return (
        <>
            <TransitionOverlay>
                main
                <Button text='clear' handleClick={()=>ref.current?.clearValue()}/>
                <FileInput resumableId={'file'} options={{ fileType: ['csv'] }} multiple={true} accept={'.csv'} />
                <div className="" style={{ width: 500, height: 300, border: '1px solid' }}>
                    <DragNDropInput resumableId={'table'} />
                </div>
                <Formik validationSchema={validationSchema} initialValues={{ priority: 2,title: '', role: '',date: '',desc: '' }} onSubmit={console.log} enableReinitialize={true}>
                    {({handleSubmit,handleChange,values,setFieldValue,touched,errors})=>(<form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
                        <Select ref={ref} label='priority' name='priority' handleChange={setFieldValue} isMulti={false} options={priorityOptions} value={values.priority}/>
                        <Input label='title' name='title' onChange={handleChange} value={values.title}/>
                        <DatePickerWithLabel label='date' name='date' setFieldValue={setFieldValue} value={values.date}/>
                        <TextArea name='desc' onChange={handleChange} value={values.desc} touched={touched.desc} errors={errors.desc}/>
                        <Button text='submit' type='submit'/>
                    </form>)}
                </Formik>
            </TransitionOverlay>
        </>
    )
}