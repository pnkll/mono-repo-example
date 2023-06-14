import { dateFormat } from '@src/helpers/dateFormat';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { isNil } from 'lodash';
import moment from 'moment';
import React from 'react';
import Button from '../../components/Button/Button';
// import Table from '../../components/Table/Table';
import { taskApi } from '@services/TaskService'
import { withTransition } from '@src/hocs/withTransition/withTransition';
import { useSocket } from '@src/providers/Socket/SocketContext';
import { BaseTable } from '@src/shared/UiKit/Table/index';

function TaskList() {
    // const {data: taskList}=taskApi.useGetTasksQuery()
    // function formatDate(date) {
    //     return moment(date).locale('ru').format("Do MMMM YYYY")
    // }
    const columns = React.useMemo(() => [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Статус', accessor: 'status' },
        { Header: 'Дата создания', accessor: 'createdAt', type: 'sort', sort: 0, Cell: ({ value }) => value },
        { Header: 'Последнее обновление', accessor: 'updatedAt', type: 'sort', sort: 0, Cell: ({ value }) => value }
    ], [])
    return (
        <>
            {/* <Table
                sortable={['createdAt', 'updatedAt']}
                createHref='new'
                customColumns={columns}
                rtkHook={taskApi.useLazyGetTasksQuery}
                filterable={false}
                editable={false}
            /> */}
            <BaseTable
                rtkHook={taskApi.useLazyGetTasksQuery}
                customColumns={columns}
            />
        </>
    )
}

export default TaskList = withTransition(TaskList, 'TaskList','bottom')