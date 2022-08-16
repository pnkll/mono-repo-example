import { useTable } from "react-table"
import Paginate from "../Paginate/Paginate.jsx"
import './Table.scss'

export default function Table({ columns, data, currentPage, setCurrentPage, totalItemsCount, itemsCount, className}) {

    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps, } = useTable({ columns, data})

    const classNamePreffix = className||'table'

    return (
        <>
            <table className={`${classNamePreffix}__container`}>
                <thead {...getTableProps()} className={`${className?className:'table'}__header`}>
                    {headerGroups.map((headerGroup,index) => <tr key={index} {...headerGroup.getHeaderGroupProps} className={`${classNamePreffix}__header__row`}>
                        {headerGroup.headers.map((header,index) => <th key={index} {...header.getHeaderProps} className={`${classNamePreffix}__header__elem`}>{header.Header}</th>)}
                    </tr>)}
                </thead>
                <tbody {...getTableBodyProps} className={`${classNamePreffix}__body`}>
                    {rows.map((row,index) => {
                        prepareRow(row)
                        return <tr key={index} {...row.getRowProps()} className={`${classNamePreffix}__body__row`}>
                            {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps} className={`${classNamePreffix}__body__elem__wrapper`}>
                                <div className={`${classNamePreffix}__body__elem`}>{cell.render('Cell')}</div>
                            </td>)}
                        </tr>
                    })}
                </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px auto'}}>
                <Paginate setPage={setCurrentPage} page={currentPage} itemsCount={itemsCount} totalItemsCount={totalItemsCount}/>
            </div>
            </>
    )
}