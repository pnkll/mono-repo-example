import { useTable } from "react-table"
import Paginate from "../Paginate/Paginate.jsx"
import './Table.scss'
import React, { useState } from "react"
import HeaderInput from "./HeaderInput/HeaderInput.jsx"
import Filters from "./Filters/Filters.jsx"
import SelectNumber from "../SelectNumber/SelectNumber.jsx"
import _, { isNil } from "lodash"

export default React.memo(function Table({ setFilters, filters, setSearch, search, columns, data, currentPage, setCurrentPage, totalItemsCount, itemsCount, classNamePrefix = 'table', setItemsCount, emptyCell = 'Ничего не найдено', handleCreate, buttonHref, label }) {
    // сonst formatColumns =  (columns.map(column=>!isNil(column.Cell)?column:{...column, Cell: ({ cell: { value } }) => !isNil(value)?value:'—'  } ))
    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps, } = useTable({ columns, data })
    

    const handleSearch = (value, header) => {
        setSearch({ ...search, id: header.id, value: value })
    }

    const selectType = (header) => {
        try {
            switch (header.type) {
                case 'filter': return <HeaderInput header={header} handleSearch={handleSearch} />
            }
        } catch (error) {
            return header.render('Header')
        }
        return header.render('Header')
    }

    const [open, setOpen] = useState(true)

    return (
        <>
            <div className={`${classNamePrefix}__container`} style={{ marginBottom: open ? 0 : 24, height: `${open ? label?'calc(100% - 45px)':'calc(100% - 20px)' : 0}` }}>
                {!isNil(label) && <h1 style={{ paddingLeft: '13px' }}>{label}</h1>}
                <div className={`${classNamePrefix}__sub-container`} style={{ height: '100%'}}>
                    <Filters classNamePrefix={classNamePrefix} filters={filters} setFilters={setFilters} handleOpen={setOpen} isOpen={open} handleCreate={handleCreate} href={buttonHref} />
                    <div className={`${classNamePrefix}__scroll-wrapper`} style={{ borderRadius: '10px', maxHeight: 'calc(100vh - 163px)', overflow: 'auto', height: `${open ? '100%' : 0}`, minWidth: '527px' }}>
                        <table className={`${classNamePrefix}__wrapper`}>
                            <thead {...getTableProps()} className={`${classNamePrefix}__header`}>
                                {headerGroups.map((headerGroup, index) => <tr key={index} {...headerGroup.getHeaderGroupProps} className={`${classNamePrefix}__header__row`}>
                                    {headerGroup.headers.map((header, index) => <th key={index} {...header.getHeaderProps} className={`${classNamePrefix}__header__elem`}>{selectType(header)}</th>)}
                                </tr>)}
                            </thead>
                            <tbody {...getTableBodyProps} className={`${classNamePrefix}__body`}>
                                {rows.length > 0 ? rows.map((row, index) => {
                                    prepareRow(row)
                                    return <tr key={index} {...row.getRowProps()} className={`${classNamePrefix}__body__row`}>
                                        {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps} className={`${classNamePrefix}__body__elem__wrapper`}>
                                            <div className={`${classNamePrefix}__body__elem`}>{cell.render('Cell')}</div>
                                        </td>)}
                                    </tr>
                                }) :
                                    <tr className={`${classNamePrefix}__body__row`}><td
                                        style={{
                                            minWidth: '500px',
                                            textAlign: 'center',
                                            padding: '30px 0',
                                            height: '100px'
                                        }}
                                        colSpan={columns.length}>{emptyCell}</td></tr>
                                }
                            </tbody>
                        </table>
                        <div className="table__bottom">
                            {!_.isEmpty(data) && totalItemsCount > itemsCount && <Paginate setPage={setCurrentPage} page={currentPage} itemsCount={itemsCount} totalItemsCount={totalItemsCount} />}
                            {!_.isEmpty(data) && <div className="table__bottom__counts">
                                <SelectNumber defaultValue={itemsCount} values={[5, 10, 15, 20]} handleChange={setItemsCount} />
                                <p className="table__bottom__counts__info">{((currentPage - 1) * itemsCount) + 1}&nbsp;—&nbsp;{itemsCount * currentPage} из {totalItemsCount} записей</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})