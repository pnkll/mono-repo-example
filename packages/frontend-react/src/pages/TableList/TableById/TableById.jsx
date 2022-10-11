import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DragNDropCell from '../../../components/DragNDropCell/DragNDropCell.jsx';
import DragNDropModal from '../../../components/DragNDropModal/DragNDropModal.jsx';
import Table from '../../../components/Table/Table.jsx';
import TransitionLayout from '../../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../../services/TableService.js';

export default function TableById() {
    const params = useParams()
    const [itemsCount, setItemsCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterData, setFilterData] = useState(null)
    const [getTable, { data: table, isFetching }] = tableApi.useLazyGetTableContentsQuery()
    function getColumns() {
        if (!isNil(table?.headers)) {
            return Object.keys(table?.headers).map((el, index) => el
                ? { Header: Object.values(table?.headers)[index], accessor: el }
                : el)
        }
        return []
    }
    useEffect(() => {
        getTable({ table_id: params.id, limit: itemsCount, page: currentPage })
    }, [itemsCount, currentPage])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const buttons = React.useMemo(() => [
        { text: 'Загрузить данные', callback: () => setIsOpenModal(!isOpenModal), className:'table__filters button' },
        { text: 'Добавить строчку', callback: () => setIsOpenModal(!isOpenModal), className:'table__filters button' }], [])
    return (
        <>
            <TransitionLayout from='bottom' overflowX='hidden'>
                {!isNil(table) && <Table
                    isFetching={isFetching}
                    id={params.id}
                    columns={getColumns()}
                    data={filterData !== null ? filterData : table?.docs?.map(el => el ? el.data : el)}
                    totalItemsCount={table.totalDocs}
                    itemsCount={itemsCount}
                    setItemsCount={setItemsCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setFilterData={setFilterData}
                    emptyCell={<DragNDropCell id={params.id} rtkHook={tableApi.useUploadFileMutation}/>}
                    buttons={buttons}
                />}
            </TransitionLayout>
            <DragNDropModal id={params.id} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
        </>
    )
}