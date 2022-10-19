import { useTable } from "react-table"
import './Table.scss'
import React, { useState } from "react"
import HeaderInput from "./HeaderInput/HeaderInput.jsx"
import Filters from "./Filters/Filters.jsx"
import _, { isNil } from "lodash"
import Filter from "./Filter/Filter.jsx"
import HeaderSort from "./HeaderSort/HeaderSort.jsx"
import PreloaderCell from "./PreloaderCell/PreloaderCell.jsx"
import DragNDropCell from "../DragNDropCell/DragNDropCell.jsx"
import { useParams } from "react-router-dom"
import EditRow from "./EditRow/EditRow.jsx"
import TableProvider from "../../Providers/Table/TableProvider.jsx"
import { useContext } from "react"
import { TableContext } from "../../Providers/Table/TableContext.js"
import { tableApi } from "../../services/TableService.js"
import TableBottom from "./TableBottom/TableBottom.jsx"
import { setLimit, setPage, setTotalDocs, setTotalPages } from "../../Providers/Table/TableReducer.js"
import useTableSort from "../../hooks/useTableSort"

//React.memo(
const TableInner=React.memo(({
    id,
    setFilters,
    filters,
    setSearch,
    search,
    customData,
    customColumns,
    classNamePrefix = 'table',
    emptyCell = 'Ничего не найдено',
    label,
    //sortDataCallback,
    rtkHook=tableApi.useLazyGetTableContentsQuery,
})=> {

    //addContent
    //const [postContent,{isSuccess}]=tableApi.useAddContentMutation()




    const [getTableData, { data: tableData, isSuccess, isFetching, isError }] = rtkHook()
    const [filterData, setFilterData] = React.useState(null)
    const [fetching, setFetching] = useState(false)

    function getColumns() {
        if (!isNil(customColumns)) {
            return customColumns
        }
        if (!isNil(tableData?.headers)) {
            return Object.keys(tableData?.headers).map((el, index) => el
                ? { Header: Object.values(tableData?.headers)[index], accessor: el }
                : el)
        }
        return []
    }
    function getData() {
        if(!isNil(customData)){
            return customData
        }
        else if (!isNil(filterData)) {
            return filterData
        }
        else if (!isNil(tableData)) {
            return tableData?.docs.map(el => el.hasOwnProperty('data') ? el.data : el)
        }
        return []
    }

    const columns = React.useMemo(() => getColumns(), [tableData])
    const data = React.useMemo(() => getData(), [tableData])
    const { sort, stateColumns, sortDataCallback } = useTableSort({ columns })
    
    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps } = useTable({ columns:stateColumns,data })

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

    const [state, dispatch] = useContext(TableContext)
    React.useEffect(() => {
        isNil(customData)&&!isNil(sort)&&getTableData({ table_id: id, limit: state.limit, page: state.page, sort: sort })
    }, [state.page, state.limit, sort])

    React.useEffect(() => {
        if (!isNil(tableData)) {
            dispatch(setLimit(tableData.limit))
            dispatch(setPage(tableData.page))
            dispatch(setTotalDocs(tableData.totalDocs))
            dispatch(setTotalPages(tableData.totalPages))
        }
    }, [tableData])

    if (isNil(customData)&&!isSuccess) {
        return <>Preloader</>
    }
    return (
        <>
            {/* <TableProvider> */}
            <div className={`${classNamePrefix}__container`} style={{ marginBottom: open ? 0 : 24, height: `${state.isOpen ? label ? 'calc(100% - 45px)' : 'calc(100% - 20px)' : 0}` }}>

                <div className={`${classNamePrefix}__sub-container`} style={{ height: '100%' }}>
                    
                    <Filters
                        classNamePrefix={classNamePrefix}
                        filters={filters}
                        setFilters={setFilters}
                        hasFilter
                        editable />

                    <div className={`${classNamePrefix}__scroll-wrapper`} style={{ borderRadius: '10px', transition: 'all 0.5s ease', maxHeight: 'calc(100vh - 143px)', overflow: 'auto', height: `${open ? '100%' : '0%'}`, minWidth: '527px' }}>
                        {/* {!isNil(label) && <h1 style={{ paddingLeft: '13px' }}>{label}</h1>} */}

                        {state.filterMode
                            && <Filter
                                table_id={id}
                                setFilterData={setFilterData}
                                setFetching={setFetching}
                                columns={columns} />}

                        <table className={`${classNamePrefix}__wrapper`}>
                            <thead {...getTableProps()} className={`${classNamePrefix}__header`}>
                                {headerGroups.map((headerGroup, index) => <tr key={index} {...headerGroup.getHeaderGroupProps} className={`${classNamePrefix}__header__row`}>
                                    {headerGroup.headers.map((header, index) => <th key={index} {...header.getHeaderProps} className={`${classNamePrefix}__header__elem`}>{selectType(header)}</th>)}
                                </tr>)}
                                {(fetching || isFetching) && <PreloaderCell colSpan={headerGroups[headerGroups.length - 1].headers.length} />}
                            </thead>
                            <tbody {...getTableBodyProps} className={`${classNamePrefix}__body`} style={{ opacity: (fetching || isFetching) ? '0.6' : 1 }}>

                                {(rows.length > 0 && !state.dragDropMode) ? <>
                                    {rows.map((row, index) => {
                                        prepareRow(row)
                                        return <tr key={index} {...row.getRowProps()} className={`${classNamePrefix}__body__row`}>
                                            {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps} className={`${classNamePrefix}__body__elem__wrapper`}>
                                                <div className={`${classNamePrefix}__body__elem`}>{cell.render('Cell')}</div>
                                            </td>)}
                                        </tr>
                                    })}
                                    {state.addContent.editMode && !isFetching && <EditRow classNamePrefix={classNamePrefix} headerGroups={headerGroups} />}
                                    <tr style={{ height: '100%', background: 'white' }}>
                                        <td colSpan={headerGroups[headerGroups.length - 1].headers.length} />
                                    </tr>
                                </>
                                    : !state.dragDropMode && <tr className={`${classNamePrefix}__body__row`}><td
                                        style={{
                                            minWidth: '500px',
                                            textAlign: 'center',
                                            padding: '30px 0',
                                            height: '100px',
                                            background: 'white'
                                        }}
                                        colSpan={headerGroups[headerGroups.length - 1]?.headers.length}>{emptyCell}</td></tr>
                                }
                                {state.dragDropMode && <tr className={`${classNamePrefix}__body__row`}><td
                                    style={{
                                        minWidth: '500px',
                                        textAlign: 'center',
                                        padding: '30px 0',
                                        height: '100px',
                                        background: 'white'
                                    }}
                                    colSpan={headerGroups[headerGroups.length - 1].headers.length}><DragNDropCell id={id} /></td></tr>}
                            </tbody>
                        </table>
                        <TableBottom data={data} />
                    </div>
                </div>
            </div>
            {/* </TableProvider> */}
        </>
    )
})
//)


export default function Table(props) {

    return <TableProvider>
        <TableInner {...props} />
    </TableProvider>
}