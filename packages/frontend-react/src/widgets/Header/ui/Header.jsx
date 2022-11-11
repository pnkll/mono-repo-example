import Button from '@components/Button/Button'
import { UserCircleIcon } from '@heroicons/react/outline'
import { Navbar } from '@src/entities/header/Navbar/index'
import { ToggleTheme } from '@src/features/theme/toogle-theme/index'
import { logout } from '@store/slices/appSlice'
import { selectCurrentUser } from '@store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import s from './Header.module.scss'

export default function Header(){
   const navigate=useNavigate()
   const dispatch =useDispatch()
   const id = useSelector((state)=>state.userSlice.user?._id)
   return(
       <>
          <div className={s.container}>
            <Navbar/>
            <div className={s['right-side']}>
               <ToggleTheme/>
               <UserCircleIcon width={27} onClick={()=>navigate(`../users/${id}`)} style={{cursor: 'pointer'}}/>
               <Button text='Выйти' handleClick={()=>dispatch(logout())}/>
            </div>
          </div>
       </>
   )
}