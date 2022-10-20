import { BackspaceIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

export default function DialPanel({ expanded, number, setNumber }) {
    const [dialMode, setDialMode] = React.useState(false)
    //const [number, setNumber] = React.useState('')
    const [digital, setDigital] = React.useState([])
    function handleClickDigit(key) {
        setNumber(number + key)
    }
    function handleRemove() {
        setNumber(number.slice(0, -1))
    }
    React.useEffect(() => {
        !expanded && setDialMode(false)
    }, [expanded])
    const transition = useTransition(digital, {
        from: { width: 0, height: 0, opacity: 0, margin: 0, fontSize: 0, padding: '0 0' },
        enter: item => async (next) => {
            await next({ width: 43, height: 21, opacity: 1, delay: item.delay, margin: 5, fontSize: 16, padding: '10px 0' })
        },
        leave: item => async (next) => {
            await next({ width: 0, height: 0, opacity: 0, delay: item.delay, margin: 0, fontSize: 0, padding: '0 0' })
        },
    })
    const keys = React.useMemo(() => [
        { key: 1, delay: 100, },
        { key: 2, delay: 200, },
        { key: 3, delay: 300, },
        { key: 4, delay: 400, },
        { key: 5, delay: 500, },
        { key: 6, delay: 600, },
        { key: 7, delay: 700, },
        { key: 8, delay: 800, },
        { key: 9, delay: 900, },
        { key: '*', delay: 1000, },
        { key: 0, delay: 1100, },
        { key: '#', delay: 1200, },
    ], [])
    React.useEffect(() => {
        dialMode ? setDigital(keys) : setDigital([])
    }, [dialMode])
    return (
        <>
            {!dialMode
                ? <Button text='Совершить звонок' handleClick={() => setDialMode(true)} />
                : <div className='call-control__number-panel__number'>
                    <Input value={number} handleChange={(e) => setNumber(e.target.value)} className='call-control__number-panel__input' />
                    <BackspaceIcon className='call-control__number-panel__backspace-icon' width={15} onClick={handleRemove} />
                    <XIcon className='call-control__number-panel__x-icon' width={30} onClick={() => setDialMode(false)} />
                </div>
            }
            {<div className="call-control__number-panel">
                {transition((style, item) =>
                    <animated.div style={style} className='call-control__number-panel__elem' onClick={() => handleClickDigit(item.key)}>
                        {item.key}
                    </animated.div>)}
            </div>}
        </>
    )
}