import s from './Body.module.scss'
import classNames from 'classnames/bind'
import Row from '@src/shared/UiKit/Table/ui/body/row/Row'
import Cell from '@src/shared/UiKit/Table/ui/body/cell/Cell'
import FillRow from '@src/shared/UiKit/Table/ui/body/row/fill-row/FillRow'

const cx = classNames.bind(s)

export default function Body({ children, tableBodyProps, rows, prepareRow, isFetching = false, headerGroups, ...other }) {
    return (
        <>
            <tbody
                {...tableBodyProps}
                className={cx(s.container, { fetching: isFetching })}
                {...other}
            >
                {rows.map(row => {
                    prepareRow(row)
                    return <Row
                        {...row.getRowProps()}
                        prepareRow={prepareRow}
                        row={row}>
                        {row.cells.map(cell =>
                            <Cell cell={cell} {...cell.getCellProps()} />
                        )}
                    </Row>
                })}
                <FillRow
                    headerGroups={headerGroups}
                />
            </tbody>
        </>
    )
}