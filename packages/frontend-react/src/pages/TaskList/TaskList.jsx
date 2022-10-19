import { isNil } from 'lodash';
import moment from 'moment';
import React from 'react';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import {taskApi} from '../../services/TaskService'

export default function TaskList(){
    const {data: taskList}=taskApi.useGetTasksQuery()
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = React.useMemo(()=>[
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Статус', accessor: 'status' },
        { Header: 'Дата создания', accessor: 'createdAt', type: 'sort', sort: 0 },
        { Header: 'Последнее обновление', accessor: 'updatedAt', type: 'sort', sort: 0 }
    ],[])
   return(
       !isNil(taskList)&&
       <Table
       createHref='new'
       customColumns={columns}
       customData={taskList.map(el=>el&&{...el, createdAt: formatDate(el.createdAt), updatedAt: formatDate(el.updatedAt)})}
       />
   )
}