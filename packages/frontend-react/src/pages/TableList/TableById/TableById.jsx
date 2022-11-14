import Table from '@components/Table/Table';
import { tableApi } from '@services/TableService';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { useSocket } from '@src/providers/Socket/SocketContext';
import { BaseTable } from '@src/shared/UiKit/Table/index';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function TableById() {
    const params = useParams()
    const io = useSocket()
    // React.useEffect(()=>{
    //     io.on('tables:chunkLoad',console.log)
    //     io.on('tables:finishLoad',console.log)
    //     io.on('tables:startLoad',console.log)
    // },[])
    return (
        <>
            <TransitionOverlay from='bottom' overflowX='hidden'>
                {/* <Table
                    sortable={[]}
                    filterable={true}
                    editable={true}
                    hasFilter={true}
                    id={params.id}
                    rtkHook={tableApi.useLazyGetTableContentsQuery}
                /> */}
                <BaseTable
                    rtkHook={tableApi.useLazyGetTableContentsQuery}
                />
            </TransitionOverlay>
        </>
    )
}