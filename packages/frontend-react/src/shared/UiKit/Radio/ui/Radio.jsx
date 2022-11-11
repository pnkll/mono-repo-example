import s from './Radio.module.scss'

export default function Radio(){
   return(
       <>
        <div className={s.container}>
            <label className={s.label} htmlFor=""/>
            <input className={s.input} type='radio'/>
        </div>
       </>
   )
}