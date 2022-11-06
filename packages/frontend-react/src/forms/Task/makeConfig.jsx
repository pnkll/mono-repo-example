import { taskApi } from '@services/TaskService'

export function makeConfig(){
   return {
    mapPropsToValues: ()=>({
        title: '',
        status: '',
        description: '',
        priority: '',
    }),
    handleSubmit: (values)=>{
        console.log(values)
    },
    displayName: 'TaskForm'
   }
}
