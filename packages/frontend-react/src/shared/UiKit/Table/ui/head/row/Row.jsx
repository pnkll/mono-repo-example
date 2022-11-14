import s from './Row.module.scss'

export default function Row({ children, headerGroup }) {
    return (
        <>
            <tr
                className={s.container}
                {...headerGroup.getHeaderGroupProps}
            >
                {children}
            </tr>
        </>
    )
}