import React from 'react';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import { Link } from 'react-router-dom'
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';

export default React.memo(function Roles() {
    const columns = [
        { Header: 'Id', accessor: 'id' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Права', accessor: 'permissions' },
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