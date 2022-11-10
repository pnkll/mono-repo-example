import { Link, useLocation } from 'react-router-dom'
import s from './NavLink.module.scss'
import classnames from 'classnames/bind'

const cx = classnames.bind(s)

export default function NavLink({to,text}){
   const {pathname} = useLocation()
   const active=to.replaceAll('.','')===pathname
   
   return(
       <>
          <span className={cx(s.container,{active})}>
            <Link to={to}>{text}</Link>
          </span>
       </>
   )
}