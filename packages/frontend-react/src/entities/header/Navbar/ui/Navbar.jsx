import { NavLink } from '@src/features/entities/header/NavLink/index'
import s from './Navbar.module.scss'

export default function Navbar(){
   return(
       <>
          <nav className={s.container}>
            <NavLink to='../' text='Главная' active/>
            <NavLink to='../tasks' text='Задачи' active/>
          </nav>
       </>
   )
}