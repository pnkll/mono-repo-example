import s from './Cell.module.scss'

export default function Cell({ cell }) {
    return (
        <>
            <td
                className={s.container}
                {...cell.getCellProps}
            >
                <div className={s.item}>
                    {cell.render('Cell')}
                </div>
            </td>
        </>
    )
}