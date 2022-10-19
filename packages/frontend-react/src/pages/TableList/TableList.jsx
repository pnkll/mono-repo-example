import React from 'react';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../services/TableService.js';
import Table from '../../components/Table/Table.jsx'
import Button from '../../components/Button/Button.jsx';
import moment from 'moment';

export default function TableList() {
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = React.useMemo(() => [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt',  Cell: ({ value }) => formatDate(value) },
        { Header: 'Последнее обновление', accessor: 'updatedAt', Cell: ({ value }) => formatDate(value) }
    ])
    return (
        <>
            <TransitionLayout from='right'>
                <Table
                    customColumns={columns}
                    rtkHook={tableApi.useLazyGetTablesQuery}
                    filterable={false}
                    editable={false}
                    sortable={true}
                />
            </TransitionLayout>
        </>
    )
}