import React from 'react';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../services/TableService.js';
import Table from '../../components/Table/Table.jsx'
import { isNil } from 'lodash';
import Button from '../../components/Button/Button.jsx';
import moment from 'moment';
import useTableSort from '../../hooks/useTableSort.js';
import PreloaderForPage from '../../components/PreloaderForPage/PreloaderForPage.jsx';
import ErrorForPage from '../../components/ErrorForPage/ErrorForPage.jsx';
import useQueryProps from '../../hooks/useQueryProps.js';

export default function TableList() {
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = React.useMemo(() => [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt', type: 'sort', sort: 0, Cell: ({value})=>formatDate(value) },
        { Header: 'Последнее обновление', accessor: 'updatedAt', type: 'sort', sort: 0, Cell: ({value})=>formatDate(value) }
    ])
    const { sort, stateColumns, sortDataCallback } = useTableSort({ columns })
    //const [data, limit, setLimit, page, setPage, isFetching, isLoading, isError] = useQueryProps({ itemsCount: 10, currentPage: 1, sort, rtkHook: tableApi.useLazyGetTablesQuery })
    const buttons = React.useMemo(() => [{ text: 'Создать', href: 'new', className: 'table__filters button' }], [])
    return (
        <>
            {/* {isLoading && <PreloaderForPage />}
            {isError && <ErrorForPage />} */}
            <TransitionLayout from='right'>
                {/* {!isNil(data)
                    && <Table
                        buttons={buttons}
                        sortDataCallback={sortDataCallback}
                        columns={stateColumns}
                        isFetching={isFetching}
                        data={data.docs.map(doc => doc
                            ? { ...doc, createdAt: formatDate(doc.createdAt), updatedAt: formatDate(doc.updatedAt) }
                            : doc)}
                        currentPage={page}
                        setCurrentPage={setPage}
                        itemsCount={limit}
                        setItemsCount={setLimit}
                        totalItemsCount={data.totalDocs} />} */}
                {/* {!isNil(data) && */}
                    <Table
                        //sortDataCallback={sortDataCallback}
                        customColumns={columns}
                        //customData={[]}
                        //customData={data.docs.map(doc => doc
                           // ? { ...doc, createdAt: formatDate(doc.createdAt), updatedAt: formatDate(doc.updatedAt) }
                            //: doc)}
                        rtkHook={tableApi.useLazyGetTablesQuery}
                        filterable={false}
                        editable={false}
                    />
                    {/* } */}
            </TransitionLayout>
        </>
    )
}