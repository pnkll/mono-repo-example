import React from 'react';
import Table from '../../components/Table/Table.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';

export default React.memo(function TaskTypeList() {
    const columns = [
        { Header: 'Id', accessor: 'id' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Исполнитель', accessor: 'executor' },
        { Header: 'Ответственный', accessor: 'controller' },
        { Header: 'Время на выполнение', accessor: 'requiredTime' },
        { Header: 'Прикрепить', accessor: 'linkedContent' },
        { Header: 'Dead Line', accessor: 'deadLineHours' },
        { Header: 'Степень важности', accessor: 'priority' },
    ]
    return (
        <>
            <SidebarHeaderLayout>
                <TransitionLayout from='bottom'>
                    <Table columns={columns} data={[]} buttonHref={'new'} />
                </TransitionLayout>
            </SidebarHeaderLayout>
        </>
    )
})