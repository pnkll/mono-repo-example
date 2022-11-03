import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { isNil } from 'lodash';
import Button from '../../components/Button/Button.jsx';
import ErrorForPage from '../../components/ErrorForPage/ErrorForPage.jsx';
import NavTableTd from '../../components/NavTableTd/NavTableTd.jsx';
import PreloaderForPage from '../../components/PreloaderForPage/PreloaderForPage.jsx';
import Table from '../../components/Table/Table.jsx';
import { usersApi } from '../../services/UsersService';

export default function UsersList(){
    const [confirmUser]=usersApi.useConfirmUsersMutation()
    const {data: users, isLoading,isError,isFetching,isSuccess}=usersApi.useGetUsersQuery()
    console.log(users)
    const columns=[
        {Header: '', accessor: '_id', Cell: ({cell:{value}})=><NavTableTd href={value}/>||'-'},
        {Header: 'Логин', accessor: 'username'},
        {Header: 'Имя', accessor: 'firstname'},
        {Header: 'Фамилия', accessor: 'lastname'},
        {Header: 'Телефон', accessor: 'phone'},
        {Header: 'Почта', accessor: 'email'},
        {Header: '', accessor: 'verified', Cell: ({cell:{value}})=>!value?<Button handleClick={()=>confirmUser([value])} text='Подтвердить' color='green'/>:'Подтвержден'}
    ]
   return(
       <>
       {isLoading&&<PreloaderForPage/>}
       {isError&&<ErrorForPage/>}
       <TransitionOverlay from='bottom'>
            {isSuccess&&
            <Table 
                customColumns={columns} 
                customData={users}
                />}
       </TransitionOverlay>
       </>
   )
}