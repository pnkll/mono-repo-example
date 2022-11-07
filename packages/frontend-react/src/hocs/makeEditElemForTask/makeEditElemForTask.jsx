
import { taskApi } from '@services/TaskService'
import React from 'react'
import { useParams } from 'react-router-dom'

export const makeEditElemForTask = (Component, displayName, rtkHook, entity) => {
    
    function Config(props) {
        const ref=React.useRef()
        const {id} = useParams()
        const [value, setValue] = React.useState(null)
        const [updateTask,{isSuccess}]=rtkHook()
        function handleAccept() {
            updateTask({ taskId: id, [entity]: value })
        }
        function handleClear() {
            ref.current.clearValue()
            setValue(null)
        }
        function handleChange(e) {
            setValue(e)
        }
        React.useEffect(()=>{
            isSuccess&&ref.current.clearValue()
        },[isSuccess])
        return (
            <Component {...props}
                handleAccept={handleAccept}
                handleClear={handleClear}
                handleChange={handleChange}
                value={value}
                setValue={setValue}
                ref={ref}
                />
        )
    }

    Config.displayName = displayName

    return Config
}