import Input from '@components/Input/Input'
import { makeConfig } from '@forms/Task/makeConfig'
import { withFormik } from 'formik'
import { isNil } from 'lodash'
import s from './TaskForm.module.scss'
import React from 'react'
import TextArea from '@components/UiKit/TextArea/TextArea'
import PrioritySelector from '@components/PrioritySelector/PrioritySelector'

function TaskForm(props){
    const {task,setFieldValue,values,touched,errors,handleSubmit,handleBlur,handleChange}=props
    React.useEffect(()=>{
      if(!isNil(task)){
        setFieldValue('title',task.title)
        setFieldValue('status',task.status)
        setFieldValue('description',task.description)
      }
    },[task])
   return(
       <>
          <form onSubmit={handleSubmit}>
            <Input id='title' name='title' handleChange={handleChange} value={values.title}/>
            <Input id='status' name='status' handleChange={handleChange} value={values.status}/>
            <TextArea id='description' name='description' onChange={handleChange} errors={errors} touched={touched} value={values.description} />
            <PrioritySelector value/>
            <button type='submit'>Submit</button>
          </form>
       </>
   )
}

export default TaskForm = withFormik(makeConfig())(TaskForm)