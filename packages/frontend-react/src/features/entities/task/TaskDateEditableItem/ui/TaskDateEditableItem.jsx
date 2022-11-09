import { DatePicker } from '@src/shared/UiKit/DatePicker/index'
import s from './TaskDateEditableItem.module.scss'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function TaskDateEditableItem({ api, label, value: val, ...other }) {
   const { id } = useParams()
   const [value, setValue] = React.useState(val)
   const [updateTask] = api()
   async function onChange(e) {
      const {status} = await updateTask({
         taskId: id,
         value: e
      })
      status===200&&setValue(e)
   }
   return (
      <>
         <span className={s.container}>
            {label}:&nbsp;<DatePicker onChange={onChange} value={value} {...other}/>
         </span>
      </>
   )
}