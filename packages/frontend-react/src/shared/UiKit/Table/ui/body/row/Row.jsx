import s from './Row.module.scss'

export default function Row({ children, prepareRow, row,...other }) {
    // prepareRow(row)
    return (
        <>
            <tr
                className={s.container}
                {...other}
            >
                {children}
            </tr>
        </>
    )
}