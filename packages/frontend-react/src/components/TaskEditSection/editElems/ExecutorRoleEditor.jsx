import RoleSelector from '@components/RoleSelector/RoleSelector'
import { taskApi } from '@services/TaskService'
import { makeEditElemForTask } from '@src/hocs/makeEditElemForTask/makeEditElemForTask'
import React from 'react'
//import s from './EditExecutorRole.module.scss'

let ExecutorRoleEditor = React.forwardRef((props,ref)=>{
    const {handleChange,handleAccept,value,handleClear}=props
   return(
       <>
          <div className="">
            Роль исполнителя
            <RoleSelector 
            ref={ref} 
            handleChange={handleChange}/>
            {value && <div className="">
                <button onClick={handleAccept}>Применить</button>
                <button onClick={handleClear}>Сбросить</button>
            </div>}
        </div>
       </>
   )
})

export default ExecutorRoleEditor = makeEditElemForTask(ExecutorRoleEditor,'ExecutorRoleEditor',taskApi.useSetExecutorRoleMutation,'executorRole')