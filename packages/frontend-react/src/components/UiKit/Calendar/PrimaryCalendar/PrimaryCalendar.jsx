//import s from './PrimaryCalendar.module.scss'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'moment/locale/ru';
import moment from 'moment';
import dateCellWrapper from './components/dateCellWrapper/dateCellWrapper';
import eventWrapper from './components/eventWrapper/eventWrapper';

export default function PrimaryCalendar({ selectable = false, ...other }) {
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
        agenda: 'Список',

        noEventsInRange: 'Нет событий в заданном промежутке.',

        showMore: total => `+${total} больше`,
    }
    const localizer = momentLocalizer(moment)
    const views = ['month', 'day', 'week', 'work_week', 'agenda']
    return (
        <>
            <Calendar
                components={{
                    dateCellWrapper,
                    eventWrapper,
                }}
                messages={messages}
                localizer={localizer}
                startAccessor={'start'}
                endAccessor={'end'}
                tooltipAccessor={'description'}
                views={views}
                defaultView={views[0]}
                selectable={true}
                resizable={true}
                {...other}
            />
        </>
    )
}