import React from 'react';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../services/TableService.js';
import Table from '../../components/Table/Table.jsx'
import Button from '../../components/Button/Button.jsx';
import moment from 'moment';
import { dateFormat } from '../../helpers/dateFormat.js';

export default function TableList() {
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = React.useMemo(() => [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt', Cell: ({ value }) => dateFormat(value,'table') },
        { Header: 'Последнее обновление', accessor: 'updatedAt', Cell: ({ value }) => dateFormat(value,'table') }
    ])
    return (
        <>
            <TransitionLayout from='right'>
                <Table
                sortable={['createdAt','updatedAt']}
                    createHref='new'
                    customColumns={columns}
                    rtkHook={tableApi.useLazyGetTablesQuery}
                    filterable={false}
                    editable={false}
                    //sortable={true}
                />
            </TransitionLayout>
        </>
    )
}