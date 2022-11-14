import s from './Container.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(s)

export default function Container({open,children}){
   return(
       <>
          <div className={cx(s.container,{open})}>
            <div className={s.wrapper}>
                {children}
            </div>
          </div>
       </>
   )
}