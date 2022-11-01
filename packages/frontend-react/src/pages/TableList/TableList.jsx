import React from 'react';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { tableApi } from '@services/TableService';
import Table from '@components/Table/Table';
import { dateFormat } from '@src/helpers/dateFormat';
import Button from '@components/Button/Button';

export default function TableList() {
    const columns = React.useMemo(() => [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt', Cell: ({ value }) => dateFormat(value,'table') },
        { Header: 'Последнее обновление', accessor: 'updatedAt', Cell: ({ value }) => dateFormat(value,'table') }
    ])
    return (
        <>
            <TransitionOverlay from='right'>
                <Table
                    sortable={['createdAt','updatedAt']}
                    createHref='new'
                    customColumns={columns}
                    rtkHook={tableApi.useLazyGetTablesQuery}
                    filterable={false}
                    editable={false}
                />
            </TransitionOverlay>
        </>
    )
}