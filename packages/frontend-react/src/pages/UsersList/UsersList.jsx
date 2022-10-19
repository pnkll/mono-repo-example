import { isNil } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import ErrorForPage from '../../components/ErrorForPage/ErrorForPage.jsx';
import NavTableTd from '../../components/NavTableTd/NavTableTd.jsx';
import PreloaderForPage from '../../components/PreloaderForPage/PreloaderForPage.jsx';
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { usersApi } from '../../services/UsersService';

export default function UsersList(){
    const [confirmUser]=usersApi.useConfirmUsersMutation()
    const columns=[
        {Header: '', accessor: '_id', Cell: ({cell:{value}})=><NavTableTd href={value}/>||'-'},
        {Header: 'Логин', accessor: 'username'},
        {Header: 'Имя', accessor: 'firstname'},
        {Header: 'Фамилия', accessor: 'lastname'},
        {Header: 'Телефон', accessor: 'phone'},
        {Header: 'Почта', accessor: 'email'},
        {Header: '', accessor: 'id', Cell: ({cell:{value}})=>!isNil(value)?<Button handleClick={()=>confirmUser([value])} text='Подтвердить' color='green'/>:'Подтвержден'}
    ]
    const [filters,setFilters]=useState([
        {title: 'Все', status: true, rtkHook: usersApi.useLazyGetUsersQuery},
        {title: 'Ожидают подтверждения', status: false, rtkHook: usersApi.useLazyGetConfirmationUsersQuery},
    ])
    const [getData,{data:users,isLoading,isFetching,isError}]=filters&&filters.find(el=>el.status).rtkHook()
    useEffect(()=>{
        getData()
    },[filters])
   return(
       <>
       {isLoading&&<PreloaderForPage/>}
       {isError&&<ErrorForPage/>}
       <TransitionLayout from='bottom'>
            {!isNil(users)
                ?<Table 
                //isFetching={isFetching}
                customColumns={columns} 
                customData={users.map(el=>el.verified===false?{...el, id: el._id}:el)}
                filters={filters}
                setFilters={setFilters}/>
                :<>Preloader</>}
       </TransitionLayout>
       </>
   )
}