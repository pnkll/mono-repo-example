import PrioritySelector from '@components/PrioritySelector/PrioritySelector'
import { taskApi } from '@services/TaskService'
import { makeEditElemForTask } from '@src/hocs/makeEditElemForTask/makeEditElemForTask'
import React from 'react'
//import s from './EditExecutorRole.module.scss'

let PriorityEditor = React.forwardRef((props,ref)=>{
    const {handleChange,handleAccept,value,handleClear}=props
   return(
       <>
          <div className="">
            Приоритет задачи
            <PrioritySelector 
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

export default PriorityEditor = makeEditElemForTask(PriorityEditor,'PriorityEditor',taskApi.useSetTaskPriorityMutation,'priority')