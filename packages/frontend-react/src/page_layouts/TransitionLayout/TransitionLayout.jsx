import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default React.memo(function TransitionLayout({ children, from = 'right' }) {
    const [transition, setTransition] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setTransition(true)
        }, 400)
    }, [])
    const position = () => {
        switch (from) {
            case 'left': return 'translateX(-100vh)'
            case 'top': return 'translateY(-100vh)'
            case 'right': return 'translateX(100vh)'
            case 'bottom': return 'translateY(100vh)'
        }
    }
    const styles = useSpring({ transform: transition ? 'translateX(0)' : position(), height: '100%',width: '100%',overflowX: 'scroll' })
    return (
        <>
            <animated.div style={styles}>
                {children}
            </animated.div>
        </>
    )
})