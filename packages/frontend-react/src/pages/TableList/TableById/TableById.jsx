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
    const [itemsCount,setItemsCount]=useState(5)
    const [currentPage,setCurrentPage]=useState(1)
    //const { data: table } = tableApi.useGetTableContentsQuery(params.id,itemsCount,currentPage)
    const [getTable,{ data: table }] = tableApi.useLazyGetTableContentsQuery()
    function getColumns() {
        if (!isNil(table?.headers)) {
            return Object.keys(table?.headers).map((el, index) => el
                ? { Header: Object.values(table?.headers)[index], accessor: el }
                : el)
        }
        return []
    }
    useEffect(()=>{
        getTable({table_id:params.id,limit:itemsCount,page:currentPage})
    },[itemsCount,currentPage])
    return (
        <>
            <TransitionLayout from='bottom'>
                {!isNil(table) && <Table 
                    columns={getColumns()} 
                    data={table?.docs?.map(el => el ? el.data : el)}
                    totalItemsCount={table.totalDocs}
                    itemsCount={itemsCount}
                    setItemsCount={setItemsCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />}
            </TransitionLayout>
        </>
    )
}