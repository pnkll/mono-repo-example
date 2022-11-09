import s from './Item.module.scss'

export default function Item({label,children, style}){
   return(
       <>
          <span className={s.container} style={style}>
            {label}:&nbsp;{children}
          </span>
       </>
   )
}