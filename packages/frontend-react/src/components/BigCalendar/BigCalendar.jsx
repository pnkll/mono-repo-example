import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment/moment';
import 'moment/locale/ru';
import { isNil } from 'lodash';
import CalendarModal from '../CalendarModal/CalendarModal';

export default function BigCalendar({events,selectable,groups=false}){

    //locales for interface
    const messages = {
        date: 'Дата',
        time: 'Время',
        event: 'Событие',
        allDay: 'Весь день',
        week: 'Неделя',
        work_week: 'Рабочая неделя',
        day: 'День',
        month: 'Месяц',
        previous: 'Назад',
        next: 'Вперед',
        yesterday: 'Вчера',
        tomorrow: 'Завтра',
        today: 'Сегодня',
        agenda: 'Повестка дня',

        noEventsInRange: 'Нет событий в заданном промежутке.',

        showMore: total => `+${total} больше`,
    }

    const resourceMap = React.useMemo(()=> [
        { resourceId: 'task', resourceTitle: 'Задачи' },
        { resourceId: 'event', resourceTitle: 'События' },
      ],[])

    const localizer = momentLocalizer(moment)

    const [showModal,setShowModal]=React.useState(false)
    const [data,setData]=React.useState(null)
    function handleSelect(data){
        setData(data)
        setShowModal(true)
    }
    React.useEffect(()=>{
        !showModal&&setData(null)
    },[showModal])
   return(
       <>
       <Calendar
                localizer={localizer}
                defaultView="month"
                events={events}
                tooltipAccessor={'description'}
                startAccessor={'start'}
                endAccessor={'end'}
                messages={messages}
                resources={groups?resourceMap:null}
                resourceIdAccessor={'resourceId'}
                resourceTitleAccessor={'resourceTitle'}
                selectable={selectable}
                onSelecting={()=>{}}
                onSelectEvent={() => console.log('select event')}
                onSelectSlot={handleSelect}
            />
        {showModal&&<CalendarModal isOpen={showModal} setIsOpen={setShowModal} data={data}/>}
       </>
   )
}