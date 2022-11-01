import React from 'react';
import { useSpring, animated } from 'react-spring';
import s from './TransitionOverlay.module.scss'

export default function TransitionOverlay({ children, from = 'right', overflowX = 'hidden', h = '100%', w = '100%', delay = 100, custom=null }) {

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
        <>

            <animated.div style={{ ...styles, overflowX: overflowX, width: w, height: h }} className={s['transition__container']}>
                {children}
            </animated.div>
        </>
    )
}