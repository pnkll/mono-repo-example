import React from 'react';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../services/TableService.js';
import Table from '../../components/Table/Table.jsx'
import { isNil } from 'lodash';
import Button from '../../components/Button/Button.jsx';
import moment from 'moment';
import { useState } from 'react';

export default function TableList() {
    const { data: tableList, isLoading, isFetching } = tableApi.useGetTablesQuery()
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = [
        { Header: 'id', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt' },
        { Header: 'Последнее обновление', accessor: 'updatedAt' }
    ]
    const [itemsCount, setItemsCount] = useState(10)
    return (
        <>
            <TransitionLayout from='right'>
                {!isNil(tableList)
                    && <Table
                        columns={columns}
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