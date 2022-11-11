import s from './withStyles.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export function withStyles(Component, displayName) {
    function Styles({ errors, touched, name, ...other }) {

        const error = touched&&errors&&touched[name] && errors[name] || false
        const valid = touched&&errors&&touched[name] && !errors[name] || false
        return (
            <div className={cx({ container: true, error, valid })}>
                <Component {...other} name={name} errors={errors} touched={touched}/>

            </div >
        )
    }
    Styles.displayName = displayName
    return Styles
}