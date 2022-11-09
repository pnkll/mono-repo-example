import s from './withStyles.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export function withStyles(Component, displayName) {
    function Styles({ errors, touched, ...other }) {

        const error = touched && errors || false
        const valid = touched && !errors || false
        return (
            <div className={cx({ container: true, error, valid })}>
                <Component {...other} />

            </div >
        )
    }
    Styles.displayName = displayName
    return Styles
}