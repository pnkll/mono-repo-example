import s from './Checkbox.module.scss'
import classNames from 'classnames/bind'
import { makeControl } from '../model/makeControl'


function Checkbox({ name, value, label, ...other }) {

    //TODO перенести стили из фигма
    return (
        <>
            <div className={s.container}>
                <input
                className={s.input}
                type='checkbox' id={name} 
                checked={value}
                {...other} />
                <label 
                className={s.label}
                htmlFor={name}>{label}</label>
            </div>
        </>
    )
}

export default makeControl(Checkbox)