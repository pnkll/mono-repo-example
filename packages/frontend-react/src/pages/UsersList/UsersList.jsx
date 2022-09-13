import { isNil } from 'lodash';
import React from 'react';
import NavTableTd from '../../components/NavTableTd/NavTableTd.jsx';
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { usersApi } from '../../services/UsersService';

export default React.memo(function UsersList(){
    const {data: users,error}=usersApi.useGetUsersQuery()
    const columns=[
        {Header: '', accessor: '_id', Cell: ({cell:{value}})=><NavTableTd href={value}/>||'-'},
        {Header: 'Логин', accessor: 'username'},
        {Header: 'Имя', accessor: 'firstname'},
        {Header: 'Фамилия', accessor: 'lastname'},
        {Header: 'Телефон', accessor: 'phone'},
        {Header: 'Почта', accessor: 'email'},
    ]
   return(
       <>
       <TransitionLayout from='bottom'>
            {!isNil(users)
                ?<Table columns={columns} data={users}/>
                :<>Preloader</>}
       </TransitionLayout>
       </>
   )
})