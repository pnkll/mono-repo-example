import DatePicker from '@components/DatePicker/DatePicker'
import PrioritySelector from '@components/PrioritySelector/PrioritySelector'
import RoleSelector from '@components/RoleSelector/RoleSelector'
import { taskApi } from '@services/TaskService'
import { useParams } from 'react-router-dom'
import s from './TaskControlPanel.module.scss'
import React from 'react'
import { isNil } from 'lodash'

export default function TaskControlPanel() {
   const { id } = useParams()
   const [setControllerRole] = taskApi.useSetControllerRoleMutation()
   function handleChangeController(roleId) {
      setControllerRole({ task: id, controllerRole: roleId })
   }
   function handleChangeExecutor(e) {
      console.log(e)
   }
   return (
      <>
         <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
            <RoleSelector label='Роль исполнителя' handleChange={handleChangeExecutor} />
            <RoleSelector label='Роль ответственного' handleChange={handleChangeController} />
            <PrioritySelector label='Приоритет задачи' handleChange={console.log} />
            <DatePicker label='Установить крайний срок' 
            customInput={<CustomInputForDatePicker id='setFireDate'/>}
            />
         </div>
      </>
   )
}

export const CustomInputForDatePicker= React.forwardRef(({value,onClick,onChange,id},ref)=>{
   
   return <input style={{display: !isNil(value)?'block':'none'}} onClick={onClick} value={value} onChange={onChange} ref={ref} id={id}
   className="date-picker__input react-datepicker-ignore-onclickoutside"
   />
})