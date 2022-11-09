import s from './Checkbox.module.scss'

export default function Checkbox({ id, value, label, ...other }) {
    return (
        <>
            <div className={s.container}>
                <input type='checkbox' id={id} checked={value} {...other} />
                <label htmlFor={id}>{label}</label>
            </div>
        </>
    )
}