import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import NavTableTd from '../../components/NavTableTd/NavTableTd.jsx';
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { usersApi } from '../../services/UsersService';

export default function UsersList(){
    const columns=[
        {Header: '', accessor: '_id', Cell: ({cell:{value}})=><NavTableTd href={value}/>||'-'},
        {Header: 'Логин', accessor: 'username'},
        {Header: 'Имя', accessor: 'firstname'},
        {Header: 'Фамилия', accessor: 'lastname'},
        {Header: 'Телефон', accessor: 'phone'},
        {Header: 'Почта', accessor: 'email'},
    ]
    const [filters,setFilters]=useState([
        {title: 'Все', status: true, rtkHook: usersApi.useLazyGetUsersQuery},
        {title: 'Ожидают подтверждения', status: false, rtkHook: usersApi.useLazyGetConfirmationUsersQuery},
    ])
    const [getData,{data:users}]=filters&&filters.find(el=>el.status).rtkHook()
    useEffect(()=>{
        getData()
    },[filters])
   return(
       <>
       <TransitionLayout from='bottom'>
            {!isNil(users)
                ?<Table 
                columns={columns} 
                data={users}
                filters={filters}
                setFilters={setFilters}/>
                :<>Preloader</>}
       </TransitionLayout>
       </>
   )
}