import s from './Button.module.scss'

export default function Button({text,children,...other}){
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