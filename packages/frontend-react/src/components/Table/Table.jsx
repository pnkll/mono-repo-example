import { useTable } from "react-table"
import Paginate from "../Paginate/Paginate.jsx"
import './Table.scss'
import React from "react"
import HeaderInput from "./HeaderInput/HeaderInput.jsx"

export default React.memo(function Table({setFilters, filters, columns, data, currentPage, setCurrentPage, totalItemsCount, itemsCount, className}) {

    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps, } = useTable({ columns, data})

    const classNamePreffix = className||'table'

    const handleFilter=(value,header)=>{
        setFilters({...filters,id:header.id,value:value})
    }

    const selectType = (header) => {
        try {
            switch (header.type) {
                case 'filter':return <HeaderInput header={header} handleFilter={handleFilter}/>
            }
        } catch (error) {
            return header.render('Header')
        }
        return header.render('Header')
    }

    return (
        <>
            <table className={`${classNamePreffix}__container`}>
                <thead {...getTableProps()} className={`${classNamePreffix}__header`}>
                    {headerGroups.map((headerGroup,index) => <tr key={index} {...headerGroup.getHeaderGroupProps} className={`${classNamePreffix}__header__row`}>
                        {headerGroup.headers.map((header,index) => <th key={index} {...header.getHeaderProps} className={`${classNamePreffix}__header__elem`}>{selectType(header)}</th>)}
                    </tr>)}
                </thead>
                <tbody {...getTableBodyProps} className={`${classNamePreffix}__body`}>
                    {rows.length>0?rows.map((row,index) => {
                        prepareRow(row)
                        return <tr key={index} {...row.getRowProps()} className={`${classNamePreffix}__body__row`}>
                            {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps} className={`${classNamePreffix}__body__elem__wrapper`}>
                                <div className={`${classNamePreffix}__body__elem`}>{cell.render('Cell')}</div>
                            </td>)}
                        </tr>
                    }):<tr className={`${classNamePreffix}__body__empty`}>Ничего не найдено</tr>}
                </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px auto'}}>
                <Paginate setPage={setCurrentPage} page={currentPage} itemsCount={itemsCount} totalItemsCount={totalItemsCount}/>
            </div>
            </>
    )
})