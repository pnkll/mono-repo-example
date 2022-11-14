import Button from '@components/Button/Button'
import s from './TaskControl.module.scss'

export default function TaskControl(){
   return(
       <>
          <div className={s.container}>
            <Button text='Приступить' color='green' disabled={true}/>
            <Button text='Редактировать' color='white' href='edit'/>
          </div>
       </>
   )
}