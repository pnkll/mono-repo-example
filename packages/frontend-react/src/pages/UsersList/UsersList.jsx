import { isNil } from 'lodash';
import React from 'react';
import NavTableTd from '../../components/NavTableTd/NavTableTd.jsx';
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { rolesApi } from '../../services/RolesService.js';
import { usersApi } from '../../services/UsersService';

export default function UsersList(){
    const {data: users,error}=usersApi.useGetUsersQuery()
    const columns=[
        {Header: '', accessor: '_id', Cell: ({cell:{value}})=><NavTableTd href={value}/>||'-'},
        {Header: 'Логин', accessor: 'username'},
        {Header: 'Имя', accessor: 'firstname'},
        {Header: 'Фамилия', accessor: 'lastname'},
        {Header: 'Телефон', accessor: 'phone'},
        {Header: 'Почта', accessor: 'email'},
    ]
    const {data: usersByRole}=rolesApi.useGetUsersByRoleIdQuery("6315fbd36480c7721d3c3450")
    const {data: usersById}=usersApi.useGetUsersByIdQuery(["6313d3219f0454d9d3c6f8a8","630f195ae645e2cd8624b5e0"])
   return(
       <>
       <TransitionLayout from='bottom'>
            {!isNil(users)
                ?<Table columns={columns} data={users}/>
                :<>Preloader</>}
       </TransitionLayout>
       </>
   )
}