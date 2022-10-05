import { useTable } from "react-table"
import Paginate from "../Paginate/Paginate.jsx"
import './Table.scss'
import React, { useState } from "react"
import HeaderInput from "./HeaderInput/HeaderInput.jsx"
import Filters from "./Filters/Filters.jsx"
import SelectNumber from "../SelectNumber/SelectNumber.jsx"
import _, { isNil } from "lodash"
import Filter from "./Filter/Filter.jsx"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"
import HeaderSort from "./HeaderSort/HeaderSort.jsx"
import PreloaderCell from "./PreloaderCell/PreloaderCell.jsx"

export default React.memo(function Table({ isFetching = false, id, setFilters, filters, filter, setFilterData, setSearch, search, columns, setColumns, data, currentPage, setCurrentPage, totalItemsCount, itemsCount, classNamePrefix = 'table', setItemsCount, emptyCell = 'Ничего не найдено', label, buttons, sortDataCallback }) {
    // сonst formatColumns =  (columns.map(column=>!isNil(column.Cell)?column:{...column, Cell: ({ cell: { value } }) => !isNil(value)?value:'—'  } ))


    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps } = useTable({ columns, data })

    const [fetching,setFetching]=useState(false)

    const handleSearch = (value, header) => {
        setSearch({ ...search, id: header.id, value: value })
    }

    const selectType = (header) => {
        try {
            switch (header.type) {
                case 'filter': return <HeaderInput header={header} handleSearch={handleSearch} />
                case 'sort': return <HeaderSort header={header} columns={columns} sortDataCallback={sortDataCallback} />
            }
        } catch (error) {
            return header.render('Header')
        }
        return header.render("Header")
    }

    const [open, setOpen] = useState(true)
    const [visibleFilter, setVisibleFilter] = useState(false)
    return (
        <>
            <div className={`${classNamePrefix}__container`} style={{ marginBottom: open ? 0 : 24, height: `${open ? label ? 'calc(100% - 45px)' : 'calc(100% - 20px)' : 0}` }}>

                <div className={`${classNamePrefix}__sub-container`} style={{ height: '100%' }}>
                    <Filters
                        setVis={setVisibleFilter}
                        vis={visibleFilter}
                        classNamePrefix={classNamePrefix}
                        filters={filters}
                        setFilters={setFilters}
                        handleOpen={setOpen}
                        isOpen={open}
                        setFilterData={setFilterData}
                        buttons={buttons} />
                    <div className={`${classNamePrefix}__scroll-wrapper`} style={{ borderRadius: '10px', transition: 'all 0.5s ease', maxHeight: 'calc(100vh - 143px)', overflow: 'auto', height: `${open ? '100%' : '0%'}`, minWidth: '527px' }}>
                        {/* {!isNil(label) && <h1 style={{ paddingLeft: '13px' }}>{label}</h1>} */}
                        {setFilterData
                            && visibleFilter
                            && <Filter
                            setFetching={setFetching}
                                setFilterData={setFilterData}
                                columns={columns}
                                id={id}
                                visibleFilter={visibleFilter} />}
                        <table className={`${classNamePrefix}__wrapper`}>
                            <thead {...getTableProps()} className={`${classNamePrefix}__header`}>
                                {headerGroups.map((headerGroup, index) => <tr key={index} {...headerGroup.getHeaderGroupProps} className={`${classNamePrefix}__header__row`}>
                                    {headerGroup.headers.map((header, index) => <th key={index} {...header.getHeaderProps} className={`${classNamePrefix}__header__elem`}>{selectType(header)}</th>)}
                                </tr>)}
                            </thead>
                            <tbody {...getTableBodyProps} className={`${classNamePrefix}__body`}>
                                {(fetching||isFetching) && <PreloaderCell colSpan={columns.length} />}
                                {rows.length > 0 ? <>
                                    {rows.map((row, index) => {
                                        prepareRow(row)
                                        return <tr key={index} {...row.getRowProps()} className={`${classNamePrefix}__body__row`}>
                                            {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps} className={`${classNamePrefix}__body__elem__wrapper`}>
                                                <div className={`${classNamePrefix}__body__elem`}>{cell.render('Cell')}</div>
                                            </td>)}
                                        </tr>
                                    })}
                                    <tr style={{ height: '100%', background: 'white' }}>
                                        <td colSpan={columns.length} />
                                    </tr>
                                </>
                                    : <tr className={`${classNamePrefix}__body__row`}><td
                                        style={{
                                            minWidth: '500px',
                                            textAlign: 'center',
                                            padding: '30px 0',
                                            height: '100px',
                                            background: 'white'
                                        }}
                                        colSpan={columns.length}>{emptyCell}</td></tr>
                                }
                            </tbody>
                        </table>
                        <div className="table__bottom">
                            {!_.isEmpty(data)
                                && totalItemsCount > itemsCount
                                && <Paginate
                                    setPage={setCurrentPage}
                                    page={currentPage}
                                    itemsCount={itemsCount}
                                    totalItemsCount={totalItemsCount} />}
                            {!_.isEmpty(data)
                                && <div className="table__bottom__counts">
                                    <SelectNumber
                                        defaultValue={itemsCount}
                                        values={[5, 10, 15, 20]}
                                        handleChange={setItemsCount} />
                                    <p className="table__bottom__counts__info">{((currentPage - 1) * itemsCount) + 1}&nbsp;—&nbsp;{(itemsCount * currentPage) > totalItemsCount
                                        ? totalItemsCount
                                        : itemsCount * currentPage} из {totalItemsCount} записей</p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})