import RoleSelector from '@components/RoleSelector/RoleSelector'
import { taskApi } from '@services/TaskService'
import { makeEditElemForTask } from '@src/hocs/makeEditElemForTask/makeEditElemForTask'
import React from 'react'
//import s from './EditExecutorRole.module.scss'

let ControllerRoleEditor = React.forwardRef((props,ref)=>{
    const {handleChange,handleAccept,value,handleClear}=props
   return(
       <>
          <div className="">
            Роль ответственного
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

export default ControllerRoleEditor = makeEditElemForTask(ControllerRoleEditor,'ControllerRoleEditor',taskApi.useSetControllerRoleMutation,'controllerRole')