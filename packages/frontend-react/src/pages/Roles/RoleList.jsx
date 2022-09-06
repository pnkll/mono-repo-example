import React from 'react';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import { Link } from 'react-router-dom'
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { rolesApi } from '../../services/RolesService.js';
import moment from 'moment';
import Button from '../../components/Button/Button.jsx';

export default React.memo(function Roles() {
    const formatDate = (date) =>{
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = [
        { Header: '',accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value}/>|| '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt'},
        { Header: 'Последнее обновление', accessor: 'updatedAt'}
    ]
    const {data,error,isLoading}=rolesApi.useGetRolesQuery()
    !isLoading&&console.log(data)
    return (
        <>
            <SidebarHeaderLayout>
                <TransitionLayout from='bottom'>
                    <Table columns={columns} data={!isLoading?data.message.map(el=>el&&{...el, createdAt: formatDate(el.createdAt),updatedAt: formatDate(el.createdAt)}):[]} buttonHref={'new'} />
                </TransitionLayout>
            </SidebarHeaderLayout>
        </>
    )
})