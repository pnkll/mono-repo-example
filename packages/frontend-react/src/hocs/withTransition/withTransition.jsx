import { taskApi } from "@services/TaskService"
import { animated, useSpring } from "react-spring"
import s from './withTransition.module.scss'

export function withTransition(Component, displayName, from = 'right', style = null, delay = 100, custom = null) {
    
    function SpawnTransition(props) {
        const position = () => {
            switch (from) {
                case 'left': return 'translateX(-100vw)'
                case 'top': return 'translateY(-100vh)'
                case 'right': return 'translateX(100vw)'
                case 'bottom': return 'translateY(100vh)'
            }
        }
        const styles = useSpring(custom ? custom : {
            from: { transform: position() },
            to: { transform: 'translateX(0)' },
            delay: delay
        })
        return (
            <animated.div style={{ ...styles, ...style }} className={s.container}>
                <Component {...props}/>
            </animated.div>
        )
    }
    SpawnTransition.displayName = displayName+'WithTransition'

    return SpawnTransition
}