import { useTable } from "react-table"
import s from './Table.module.scss'
import React, { useState } from "react"
import HeaderInput from "./HeaderInput/HeaderInput.jsx"
import TableHeader from "./TableHeader/TableHeader.jsx"
import _, { isNil } from "lodash"
import Filter from "./Filter/Filter.jsx"
import HeaderSort from "./HeaderSort/HeaderSort.jsx"
import PreloaderCell from "./PreloaderCell/PreloaderCell.jsx"
import EditRow from "./EditRow/EditRow.jsx"
import TableBottom from "./TableBottom/TableBottom.jsx"
import { ProviderTable, setLimit, setPage, setTotalDocs, setTotalPages, useTrackedTable } from "../../Providers/Table/TableContext.js"
import PreloaderForPage from "../PreloaderForPage/PreloaderForPage"
import ErrorForPage from "../ErrorForPage/ErrorForPage"
import SortableHeaderCell from "./SortableHeaderCell/SortableHeaderCell"
import FillRow from "./FillRow/FillRow"
import DragNDropRow from '../DragNDropRow/DragNDropRow'
import className from 'classnames/bind'
import { tableApi } from "@services/TableService"

const cx = className.bind(s)

//React.memo(
const TableInner = React.memo(({
    id,
    setFilters,
    filters,
    setSearch,
    search,
    customData = null,
    customColumns = null,
    cls = 'table',
    emptyCell = 'Ничего не найдено',
    label = null,
    rtkHook = tableApi.useLazyGetTableContentsQuery,
    editable = false,
    filterable = false,
    sortable = null,
    createHref = null
}) => {





    const [getTableData, { data: tableData, isSuccess, isFetching, isError }] = rtkHook()
    const [filterData, setFilterData] = React.useState(null)
    const [fetching, setFetching] = useState(false)

    const [{isOpen,dragDropMode,sort,limit,page,filterMode,addContent}, dispatch] = useTrackedTable()


    function getColumns() {
        let initialColumns = []
        if (!isNil(customColumns)) {
            initialColumns = customColumns
        }
        else if (!isNil(tableData?.headers)) {
            initialColumns = Object.keys(tableData?.headers).map((el, index) => el
                ? { Header: Object.values(tableData?.headers)[index], accessor: el }
                : el)
        }
        else {
            initialColumns = []
        }
        if (!isNil(sortable)) {
            if (_.isEmpty(sortable)) {
                return initialColumns.map(el => ({ ...el, sort: 0, Header: <SortableHeaderCell column={el} /> }))
            } else {
                return initialColumns.map(el => !_.isEmpty(sortable.filter(elem => elem === el.accessor)) ? { ...el, sort: 0, Header: <SortableHeaderCell column={el} /> } : el)
            }
        } else {
            return initialColumns
        }
    }
    function getData() {
        if (!isNil(customData)) {
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



    const columns = React.useMemo(() => getColumns(), [tableData, sort])
    const data = React.useMemo(() => getData(), [tableData, filterData])
    //Вызов параметров таблицы
    const { prepareRow, rows, headerGroups, getTableProps, getTableBodyProps } = useTable({ columns, data })

    const handleSearch = (value, header) => {
        setSearch({ ...search, id: header.id, value: value })
    }

    //Выбор типа заголовка
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


    //Получение данных для заполнения таблицы с сервера
    React.useLayoutEffect(() => {
        console.log('hll')
        if (isNil(customData)) {
            isNil(sortable)
                ? getTableData({ table_id: id, limit: limit, page: page })//С сортировкой
                : !_.isEmpty(sort)
                    ? getTableData({ table_id: id, limit: limit, page: page, sort: sort })//без сортировки
                    : getTableData({ table_id: id, limit: limit, page: page })
        }
    }, [page, limit, sort])
    //Обновление стейта после получения данных для заполнения параметров запроса
    React.useEffect(() => {
        if (!isNil(tableData)) {
            dispatch(setLimit(tableData.limit))
            dispatch(setPage(tableData.page))
            dispatch(setTotalDocs(tableData.totalDocs))
            dispatch(setTotalPages(tableData.totalPages))
        }
    }, [tableData])
    //Показать страницу с preloader
    if (isNil(customData) && !isSuccess) {
        return <PreloaderForPage />
    }
    //Показать страницу с ошибкой
    if (isError) {
        return <ErrorForPage />
    }
    return (
        <>
            <div className={cx({[`${cls}__container`]:true,'open': isOpen})}>

                <div className={s[`${cls}__sub-container`]}>

                    <TableHeader
                        classNamePrefix={cls}
                        filters={filters}
                        setFilters={setFilters}
                        filterable={filterable}
                        editable={editable}
                        createHref={createHref}
                    />

                    <div className={cx({[`${cls}__scroll-wrapper`]:true, 'open': isOpen})}>

                        {filterMode
                            && <Filter
                                table_id={id}
                                setFilterData={setFilterData}
                                setFetching={setFetching}
                                columns={columns} />}

                        <table className={s[`${cls}__wrapper`]}>
                            <thead {...getTableProps()} className={s[`${cls}__header`]}>
                                {headerGroups.map((headerGroup, index) =>
                                    <tr key={index} {...headerGroup.getHeaderGroupProps} className={s[`${cls}__header__row`]}>
                                        {headerGroup.headers.map((header, index) =>
                                            <th key={index} {...header.getHeaderProps} className={s[`${cls}__header__elem`]}>{selectType(header)}</th>)}
                                    </tr>)}
                                {(fetching || isFetching) && <PreloaderCell colSpan={headerGroups[headerGroups.length - 1].headers.length} />}
                            </thead>
                            <tbody {...getTableBodyProps} className={s[`${cls}__body`]} style={{ opacity: (fetching || isFetching) ? '0.6' : 1 }}>

                                {(rows.length > 0 && !dragDropMode)
                                    ? <>
                                        {rows.map((row, index) => {
                                            prepareRow(row)
                                            return <tr key={index} {...row.getRowProps()} className={s[`${cls}__body__row`]}>
                                                {row.cells.map((cell, index) => <td key={index} {...cell.getCellProps} className={s[`${cls}__body__elem__wrapper`]}>
                                                    <div className={s[`${cls}__body__elem`]}>{cell.render('Cell')}</div>
                                                </td>)}
                                            </tr>
                                        })}

                                        {addContent.editMode && !isFetching &&
                                            <EditRow classNamePrefix={cls} headerGroups={headerGroups} />
                                        }

                                        <FillRow headerGroups={headerGroups} />

                                    </>
                                    : !dragDropMode && !addContent.editMode ? <tr className={s[`${cls}__body__row`]}>
                                        <td
                                            style={{
                                                minWidth: '500px',
                                                textAlign: 'center',
                                                padding: '30px 0',
                                                height: '100px',
                                                background: 'white'
                                            }}
                                            colSpan={headerGroups[headerGroups.length - 1]?.headers.length}>{emptyCell}</td>
                                    </tr>
                                        : !dragDropMode && <EditRow classNamePrefix={cls} headerGroups={headerGroups} />
                                }

                                {dragDropMode && <DragNDropRow cls={cls} headerGroups={headerGroups}/>}
                            </tbody>
                        </table>
                        <TableBottom data={data} />
                    </div>
                </div>
            </div>
        </>
    )
})


export default function Table(props) {

    return <ProviderTable>
        <TableInner {...props} />
    </ProviderTable>
}

//export default Table = withTransition(Table,'Table','bottom')