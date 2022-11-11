import { Notification } from '@src/entities/notify/Notification/index'
import { selectNotifications } from '@store/slices/notificationsSlice'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import s from './NotifyContainer.module.scss'

export default function NotifyContainer(){
    const notificationList = useSelector(selectNotifications)
    const showNotify = !_.isEmpty(notificationList)
   return(
       <>{showNotify&&
          <div className={s.container}>
            {notificationList.map(({id,type,message})=><Notification key={id} id={id} message={message} type={type}/>)}
          </div>}
       </>
   )
}