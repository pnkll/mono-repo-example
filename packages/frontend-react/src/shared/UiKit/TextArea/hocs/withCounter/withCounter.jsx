import s from './withCounter.module.scss'

export function withCounter(Component, displayName){
    function Counter({value,maxLength=250,...other}){
        return(
            <Component value={value} maxLength={maxLength} {...other}>
                <span className={s.counter}>
                    {value.length}/{maxLength}
                </span>
            </Component>
        )
    }
    Counter.displayName = displayName+'WithCounter'
    return Counter
}