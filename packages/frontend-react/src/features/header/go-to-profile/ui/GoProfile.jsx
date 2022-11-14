import { UserCircleIcon } from '@heroicons/react/outline'
import s from './GoProfile.module.scss'
import {usersApi} from '@services/UsersService'
import { useNavigate } from 'react-router-dom'

export default function GoProfile(){
    const {data:user}=usersApi.useGetProfileQuery()
    const navigate = useNavigate()
   return(
       <>
          <UserCircleIcon className={s.icon} width={27} onClick={()=>navigate(`../users/${user._id}`)}/>
       </>
   )
}