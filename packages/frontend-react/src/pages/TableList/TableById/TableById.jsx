import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table/Table.jsx';
import TransitionLayout from '../../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../../services/TableService.js';

export default function TableById() {
    const params = useParams()
    // const [itemsCount, setItemsCount] = useState(10)
    // const [currentPage, setCurrentPage] = useState(1)
    //const [filterData, setFilterData] = useState(null)
    //const [getTable, { data: table, isFetching, isUninitialized }] = tableApi.useLazyGetTableContentsQuery()
    // function getColumns() {
    //     if (!isNil(table?.headers)) {
    //         return Object.keys(table?.headers).map((el, index) => el
    //             ? { Header: Object.values(table?.headers)[index], accessor: el }
    //             : el)
    //     }
    //     return []
    // }
    // useEffect(() => {
    //     getTable({ table_id: params.id, limit: itemsCount, page: currentPage })
    // }, [itemsCount, currentPage])
    //const [isOpenModal, setIsOpenModal] = useState(false)
    //const [dragDropMode, setDragDropMode] = useState(false)
    //const [editMode, setEditMode] = useState(false)
    // const buttons = React.useMemo(() => [
    //     { text: dragDropMode ? 'Показать таблицу' : 'Загрузить данные', callback: () => setDragDropMode(!dragDropMode), className: 'table__filters button' },
    //     //{ text: editMode ? 'Сохранить' : 'Редактировать', callback: () => setEditMode(!editMode), className: 'table__filters button' }
    // ], [dragDropMode, editMode])
    // useEffect(() => {
    //     if (!isUninitialized && !editMode) {
    //         getTable({ table_id: params.id, limit: itemsCount, page: table?.totalPages })
    //         setCurrentPage(table?.totalPages)
    //     } else if (!isUninitialized){
    //         setCurrentPage(table?.totalPages)
    //     }
    // }, [editMode])


    return (
        <>
            <TransitionLayout from='bottom' overflowX='hidden'>
                <Table
                    //dragDropMode={dragDropMode}
                    //isFetching={isFetching}
                    
                    //data={filterData !== null ? filterData : table?.docs?.map(el => el ? el.data : el)}
                    //totalItemsCount={table.totalDocs}
                    //itemsCount={itemsCount}
                    //setItemsCount={setItemsCount}
                    //currentPage={currentPage}
                    //setCurrentPage={setCurrentPage}
                    //setFilterData={setFilterData}
                    //emptyCell={<DragNDropCell id={params.id}/>}
                    //buttons={buttons}
                    //editMode={editMode}
                    //setEditMode={setEditMode}
                    filterable={true}
                    editable={true}
                    hasFilter={true}
                    id={params.id}
                    rtkHook={tableApi.useLazyGetTableContentsQuery}
                />
            </TransitionLayout>
            {/* <DragNDropModal id={params.id} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/> */}
        </>
    )
}