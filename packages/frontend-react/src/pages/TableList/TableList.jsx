import React from 'react';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../services/TableService.js';
import Table from '../../components/Table/Table.jsx'
import { isNil } from 'lodash';
import Button from '../../components/Button/Button.jsx';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import useTableSort from '../../hooks/useTableSort.js';
import PreloaderForPage from '../../components/PreloaderForPage/PreloaderForPage.jsx';
import ErrorForPage from '../../components/ErrorForPage/ErrorForPage.jsx';

export default function TableList() {
    const [getTables, { data: tableList, isLoading, isFetching, isError }] = tableApi.useLazyGetTablesQuery()
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = React.useMemo(() => [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt', type: 'sort', sort: 0 },
        { Header: 'Последнее обновление', accessor: 'updatedAt', type: 'sort', sort: 0 }
    ])
    const { sort, stateColumns, sortDataCallback } = useTableSort({ columns })
    const [itemsCount, setItemsCount] = useState(10)
    useEffect(() => {
        getTables(sort)
    }, [sort])
    
    return (
        <>
            {isLoading&&<PreloaderForPage/>}
            {isError&&<ErrorForPage/>}
            <TransitionLayout from='right'>
                {!isNil(tableList)
                    && <Table
                        sortDataCallback={sortDataCallback}
                        columns={stateColumns}
                        isFetching={isFetching}
                        data={tableList.docs.map(doc => doc
                            ? { ...doc, createdAt: formatDate(doc.createdAt), updatedAt: formatDate(doc.updatedAt) }
                            : doc)}
                        currentPage={tableList.page}
                        itemsCount={itemsCount}
                        setItemsCount={setItemsCount}
                        totalItemsCount={tableList.totalDocs} />}
            </TransitionLayout>
        </>
    )
}