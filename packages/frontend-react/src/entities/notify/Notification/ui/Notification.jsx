import s from './Notification.module.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import { BanIcon, CheckIcon } from '@heroicons/react/solid'
import { removeNotify } from '@store/slices/notificationsSlice'

export default function Notification({ message, type, id, from='right' }){
    const [complete, setComplete] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [intervalTimer, setIntervalTimer] = React.useState(null)
    const dispatch = useDispatch()
    function handleStartTimer() {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + 0.5
                }
                clearInterval(timer)
                return prev
            })
        }, 20)
        setIntervalTimer(timer)
    }
    function handlePauseTimer() {
        clearInterval(intervalTimer)
    }
    function handleCloseNotification() {
        handlePauseTimer()
        setComplete(true)
        setTimeout(() => {
            dispatch(removeNotify({ id: id }))
        }, 500)
    }
    React.useEffect(() => {
        handleStartTimer()
    }, [])
    React.useEffect(() => {
        if (progress === 100) {
            handleCloseNotification()
        }
    }, [progress])
    return(
       <>
          <div className={`${s['notify__container']} ${complete&&s.complete} ${s[from]}`}
                onMouseEnter={handlePauseTimer}
                onMouseLeave={handleStartTimer}
                style={{background: `${type==='error'?'rgb(243 139 139 / 93%)':'rgb(126 191 126 / 89%)'}`}}>
                <span className={s['notify__title']}>
                    {type==='error'
                    ?<><BanIcon width={20} style={{color: 'red'}}/>Ошибка</>
                    :<><CheckIcon width={20} style={{color: 'green'}}/>Успешно</>}
                </span>
                <p className={s['notify__message']}>
                    {message}
                </p>
                <i className={s['notify__progress-bar']} style={{ width: `${progress}%`, background: `${type==='error'?'#e35757':'rgb(14 179 14)'}` }} />
            </div>
       </>
   )
}