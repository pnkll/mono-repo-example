import s from './withLabel.module.scss'

export function withLabel(Component, displayName) {
    function Label({ label, ...other }) {
        return (
            <div className={s.container}>
                {label}:
                <Component {...other} />
            </div>
        )
    }
    Label.displayName = displayName
    return Label
}