import Table from '@components/Table/Table';
import { tableApi } from '@services/TableService';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function TableById() {
    const params = useParams()
    return (
        <>
            <TransitionOverlay from='bottom' overflowX='hidden'>
                <Table
                    sortable={[]}
                    filterable={true}
                    editable={true}
                    hasFilter={true}
                    id={params.id}
                    rtkHook={tableApi.useLazyGetTableContentsQuery}
                />
            </TransitionOverlay>
        </>
    )
}