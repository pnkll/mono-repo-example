import { dateFormat } from '@src/helpers/dateFormat';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { isNil } from 'lodash';
import moment from 'moment';
import React from 'react';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import {taskApi} from '@services/TaskService'

export default function TaskList(){
    // const {data: taskList}=taskApi.useGetTasksQuery()
    // function formatDate(date) {
    //     return moment(date).locale('ru').format("Do MMMM YYYY")
    // }
    const columns = React.useMemo(()=>[
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Статус', accessor: 'status' },
        { Header: 'Дата создания', accessor: 'createdAt', type: 'sort', sort: 0, Cell: ({value})=> dateFormat(value) },
        { Header: 'Последнее обновление', accessor: 'updatedAt', type: 'sort', sort: 0,  Cell: ({value})=> dateFormat(value) }
    ],[])
   return(
    <>
        <TransitionOverlay from='right'>
            <Table
            sortable={['createdAt','updatedAt']}
            createHref='new'
            customColumns={columns}
            rtkHook={taskApi.useLazyGetTasksQuery}
            filterable={false}
            editable={false}
            />
        </TransitionOverlay>
    </>
   )
}