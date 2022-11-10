import { Navbar } from '@src/entities/header/Navbar/index'
import s from './Header.module.scss'

export default function Header(){
   return(
       <>
          <div className={s.container}>
            <Navbar/>
          </div>
       </>
   )
}