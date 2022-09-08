import { isNil } from 'lodash';
import React from 'react';
import Button from '../../components/Button/Button.jsx';
import Table from '../../components/Table/Table.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { taskTypeApi } from '../../services/TaskTypeService.js';

export default React.memo(function TaskTypeList() {
    const {data,error,isLoading,isFetching,}=taskTypeApi.useGetTaskTypesQuery()
    const columns = [
        { Header: '',accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value}/>|| '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Исполнитель', accessor: 'executor' },
        { Header: 'Ответственный', accessor: 'controller' },
        { Header: 'Время на выполнение', accessor: 'requiredTime' },
        { Header: 'Прикрепить', accessor: 'linkedContent' },
        { Header: 'Dead Line', accessor: 'deadLineHours' },
        { Header: 'Степень важности', accessor: 'priority' },
    ]
    const [getTaskType]=taskTypeApi.useLazyGetTaskTypeByIdQuery()
    return (
        <>
            <SidebarHeaderLayout>
                <TransitionLayout from='bottom'>
                    {!isLoading&&<Table columns={columns} data={!isNil(data)?data.message:[]} buttonHref={'new'} emptyCell={error?'Произошла ошибка при загрузке данных':'Пока что нет ни одного шаблона'}/>}
                    <button onClick={()=>getTaskType('631876b9c450be1fa730ba34')}>CLikc</button>
                </TransitionLayout>
            </SidebarHeaderLayout>
        </>
    )
})