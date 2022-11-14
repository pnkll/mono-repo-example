import Button from '@components/Button/Button'
import { UserCircleIcon } from '@heroicons/react/outline'
import { Navbar } from '@src/entities/header/Navbar/index'
import { GoProfile } from '@src/features/header/go-to-profile/index'
import { ToggleTheme } from '@src/features/theme/toogle-theme/index'
import { logout } from '@store/slices/appSlice'
import { selectCurrentUser } from '@store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import s from './Header.module.scss'

export default function Header(){
   const dispatch =useDispatch()
   return(
       <>
          <div className={s.container}>
            <Navbar/>
            <div className={s['right-side']}>
               <ToggleTheme/>
               <GoProfile/>
               <Button text='Выйти' handleClick={()=>dispatch(logout())}/>
            </div>
          </div>
       </>
   )
}