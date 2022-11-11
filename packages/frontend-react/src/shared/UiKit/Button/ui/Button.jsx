import s from './Button.module.scss'

export default function Button({type,text,children,...other}){
   return(
       <>
          <button
          className={s.button}
          {...other}>
            {text||children}
          </button>
       </>
   )
}