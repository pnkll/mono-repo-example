import s from './Checkbox.module.scss'
import classNames from 'classnames/bind'

const cx=classNames.bind(s)

export default function Checkbox({ id, value, label, ...other }) {


    //TODO перенести стили из фигма
    return (
        <>
            <div className={s.container}>
                <input
                className={s.input}
                type='checkbox' id={id} checked={value} {...other} />
                <label 
                className={s.label}
                htmlFor={id}>{label}</label>
            </div>
        </>
    )
}