import { BackspaceIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useTransition, animated } from 'react-spring';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

export default function DialPanel({ expanded, number, setNumber }) {
    const [dialMode, setDialMode] = React.useState(false)
    function handleClickDigit(key) {
        setNumber(number + key)
    }
    function handleRemove() {
        setNumber(number.slice(0, -1))
    }
    React.useEffect(() => {
        !expanded && setDialMode(false)
    }, [expanded])
    const keys = React.useMemo(() => [
        { key: 1, },
        { key: 2, },
        { key: 3, },
        { key: 4, },
        { key: 5, },
        { key: 6, },
        { key: 7, },
        { key: 8, },
        { key: 9, },
        { key: '*', },
        { key: 0, },
        { key: '#', },
    ], [])
    const transition = useTransition(dialMode,{
        from: {height: 0,},
        enter: {height: 201,},
        leave: {height: 0,}
    })
    return (
        <>
            {!dialMode
                ? <Button text='Совершить звонок' handleClick={() => setDialMode(true)} />
                : <div className='call-control__number-panel__number'>
                    <Input value={number} handleChange={(e) => setNumber(e.target.value)} className='call-control__number-panel__input' />
                    {number.length>0&&<BackspaceIcon className='call-control__number-panel__backspace-icon' width={15} onClick={handleRemove} />}
                    <XIcon className='call-control__number-panel__x-icon' width={30} onClick={() => setDialMode(false)} />
                </div>
            }
            {transition((style,item)=>item&&<animated.div style={style} className="call-control__number-panel">
                {keys.map(item=>
                    <div key={item.key} style={style} className='call-control__number-panel__elem' onClick={() => handleClickDigit(item.key)}>
                        {item.key}
                    </div>)}
            </animated.div>)}
        </>
    )
}