import { useTable } from "react-table"
import TablePagination from "./TablePagination/TablePagination"

export default function Table({ columns, data, setCurrentPage, currentPage, pageSize, totalItems}) {

    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps, } = useTable({ columns, data })

    console.log(headerGroups)

    return (
        <>
            <table>
                <thead {...getTableProps()}>
                    {headerGroups.map((headerGroup) => <tr {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map((header) => <th {...header.getHeaderProps}>{header.Header}</th>)}
                    </tr>)}
                </thead>
                <tbody {...getTableBodyProps} className="border border-indigo-500 rounded-lg">
                    {rows.map((row) => {
                        prepareRow(row)
                        return <tr {...row.getRowProps()}>
                            {row.cells.map((cell, index) => <td {...cell.getCellProps}>
                                <div className="flex justify-center p-[5px]">{cell.render('Cell')}</div>
                            </td>)}
                        </tr>
                    })}
                </tbody>
            </table>
            <TablePagination setCurrentPage={setCurrentPage} currentPage={currentPage} pageSize={pageSize} totalCount={totalItems}/>
        </>
    )
}