import { isNil } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import { taskApi } from '../../../services/TaskService';

export default function TaskTypeById(){
    const params = useParams()
    const isNew = !isNil(params.id)?false:true
    const [getTask,{data: task}] = taskApi.useLazyGetTaskByIdQuery()
    React.useEffect(()=>{
        !isNew&&getTask(params.id)
    },[params])
    console.log(task)
   return(
       <>
        Задача
       </>
   )
}