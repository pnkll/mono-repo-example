import { useTransition, animated } from 'react-spring'
import ControllerRoleEditor from '@components/TaskEditSection/editElems/ControllerRoleEditor'
import ExecutorRoleEditor from '@components/TaskEditSection/editElems/ExecutorRoleEditor'
import PriorityEditor from '@components/TaskEditSection/editElems/PriorityEditor'

export default function TaskEditSection({ isVisible }) {
    const transition = useTransition(isVisible, {
        from: { width: 0, opacity: 0 },
        enter: { width: 161, opacity: 1 },
        leave: { width: 0, opacity: 0 }
    })
    return (
        <>
            {transition((style, item) => item && <animated.div style={style}>
                {/* <TaskEditElem api='useSetExecutorRoleMutation'/> */}
                {/* <TaskEditElem/> */}
                <ExecutorRoleEditor/>
                <ControllerRoleEditor/>
                <PriorityEditor/>
            </animated.div>)}
        </>
    )
}

