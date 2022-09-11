import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default React.memo(function TransitionLayout({ children, from = 'right',overflowX='scroll', h='100%', w= '100%' }) {
    const [transition, setTransition] = useState(false)
    useEffect(() => {
        setTransition(true)
    }, [])
    const position = () => {
        switch (from) {
            case 'left': return 'translateX(-100vw)'
            case 'top': return 'translateY(-100vh)'
            case 'right': return 'translateX(100vw)'
            case 'bottom': return 'translateY(100vh)'
        }
    }
    const styles = useSpring({ transform: transition ? 'translateX(0)' : position(), height: h,width: w, overflowX: overflowX })
    return (
        <>
            <animated.div style={styles}>
                {children}
            </animated.div>
        </>
    )
})