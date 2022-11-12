import FileInput from "../../components/FileInput/FileInput.jsx";
import DragNDropInput from "../../components/DragNDropInput/DragNDropInput.jsx";
import TransitionOverlay from "@src/overlays/TransitionOverlay/TransitionOverlay";
import React from 'react'
import Select from "@src/shared/UiKit/Select/ui/primary/Select";
import { Field, Formik } from "formik";
import { priorityOptions } from "@src/helpers/forTask";
import { InputWithLabel} from "@src/shared/UiKit/Input/index";
import * as Yup from 'yup'
import { Checkbox } from "@src/shared/UiKit/Checkbox/index";
import { Button } from "@src/shared/UiKit/Button/index";
import { SelectWithLabel } from "@src/shared/UiKit/Select/index";
import { DatePickerWithLabel } from "@src/shared/UiKit/DatePicker/index";
import { RoleSelector } from "@src/features/entities/role/RoleSelector/index";
import { UsersSelector } from "@src/features/entities/user/UsersSelector/index";


export default function Main() {

    const ref=React.useRef()

    const validationSchema = Yup.object({
        // desc: Yup.string().required(),
        title: Yup.string().required()
    })
    const [value,setValue]=React.useState(true)
    return (
        <>
            <TransitionOverlay>
                main
                {/* <Button text='clear' handleClick={()=>ref.current?.clearValue()}/> */}
                <FileInput resumableId={'file'} options={{ fileType: ['csv'] }} multiple={true} accept={'.csv'} />
                <div className="" style={{ width: 500, height: 300, border: '1px solid' }}>
                    <DragNDropInput resumableId={'table'} />
                </div>
                <Formik validationSchema={validationSchema} initialValues={{ user:'',name:'',check: true, priority: [2,1],title: '', role: '',date: '',desc: '' }} onSubmit={console.log} enableReinitialize={true}>
                    {({handleSubmit,values})=>(<form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
                        {/* <Select width={100} ref={ref} label='priority' name='priority' handleChange={setFieldValue} isMulti={false} options={priorityOptions} value={values.priority}/> */}
                        {/* <Field name='title' as={InputWithLabel} touched={touched} errors={errors} label='name'/> */}
                        {/* <Field name='check' as={Checkbox}/> */}
                        
                        {/* <Field name='name' component={Input.Form} label='name'/> */}
                        {/* <TextArea name='desc' onChange={handleChange} value={values.desc} touched={touched.desc} errors={errors.desc}/> */}
                        {/* <Button text='submit' type='submit'/> */}
                        <Field name='role' component={RoleSelector}/>
                        <Field name='user' component={UsersSelector} roleId={values.role}/>
                        <Field name='priority' component={SelectWithLabel} options={priorityOptions} isMulti={true} label='hello'/>
                        <Field name='title' component={InputWithLabel} label='title'/>
                        <Field name='date' component={DatePickerWithLabel} label='date'/>
                        <Field name='check' component={Checkbox} label='remember me'/>
                        {/* <Button text='hello' onClick={()=>setFieldValue('priority',[])}/> */}
                        <Button text='submit' type='submit'/>
                    </form>)}
                </Formik>
                {/* <Checkbox name='hello' value={value} onChange={setValue} label='hello'/> */}
                {/* <InputWithLabel label='name' value={value} onChange={setValue}/> */}
                {/* <Input.Form value={value} onChange={(e)=>setValue(e.target.value)}/> */}
            </TransitionOverlay>
        </>
    )
}