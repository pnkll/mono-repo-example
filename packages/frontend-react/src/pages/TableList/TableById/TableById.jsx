import { isNil } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table/Table.jsx';
import TransitionLayout from '../../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../../services/TableService.js';

export default function TableById() {
    const params = useParams()
    return (
        <>
            <TransitionLayout from='bottom' overflowX='hidden'>
                <Table
                    sortable={[]}
                    filterable={true}
                    editable={true}
                    hasFilter={true}
                    id={params.id}
                    rtkHook={tableApi.useLazyGetTableContentsQuery}
                />
            </TransitionLayout>
        </>
    )
}