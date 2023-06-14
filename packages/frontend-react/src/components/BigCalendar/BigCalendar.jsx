import React from 'react';
import { momentLocalizer } from 'react-big-calendar';
import './BigCalendar.scss'
import moment from 'moment/moment';
import 'moment/locale/ru';
import CalendarModal from '../CalendarModal/CalendarModal';
import dateCellWrapper from './dateCellWrapper/dateCellWrapper';
import eventWrapper from './eventWrapper/eventWrapper';
import { DnDCalendar,} from './DnDCalendar/DnDCalendar';


export default function BigCalendar({ events, selectable, groups = false, initialResource = 'all' }) {

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
        agenda: 'Список',

        noEventsInRange: 'Нет событий в заданном промежутке.',

        showMore: total => `+${total} больше`,
    }

    const resourceMap = React.useMemo(() => [
        { resourceId: 'task', resourceTitle: 'Задачи' },
        { resourceId: 'event', resourceTitle: 'События' },
    ], [])

    const localizer = momentLocalizer(moment)

    const [showModal, setShowModal] = React.useState(false)
    const [data, setData] = React.useState(null)
    function handleSelect(data) {
        setData(data)
        setShowModal(true)
    }
    React.useEffect(() => {
        !showModal && setData(null)
    }, [showModal])

    const [currentResource, setCurrentResource] = React.useState(initialResource)

    return (
        <>
            <div className="rbc-container">
                <DnDCalendar
                    components={{
                        dateCellWrapper: dateCellWrapper,
                        eventWrapper: eventWrapper, 
                    }}
                    localizer={localizer}
                    defaultView="month"
                    events={currentResource === 'all' ? events : events.filter(el => el.resourceId === currentResource)}
                    tooltipAccessor={'description'}
                    startAccessor={'start'}
                    endAccessor={'end'}
                    messages={messages}
                    resources={groups ? resourceMap : null}
                    resourceIdAccessor={'resourceId'}
                    resourceTitleAccessor={'resourceTitle'}
                    selectable={selectable}
                    onSelecting={() => { }}
                    onSelectEvent={() => console.log('select event')}
                    onSelectSlot={handleSelect}
                    views={['month', 'day', 'week', 'work_week', 'agenda']}

                    resizable={true}
                    onEventDrop={(e)=>console.log('drop',e)}
                    onDragStart={(e)=>console.log('start',e)}
                    onDragOver={(e)=>console.log('over',e)}
                    onEventResize={(e)=>console.log('resize',e)}
                />
                <div className="rbc-filter">
                    <div className="rbc-btn-group">
                        <button className={currentResource === 'all' ? 'rbc-active' : null}
                            onClick={() => setCurrentResource('all')}>Все</button>
                        {resourceMap.map(({resourceId,resourceTitle}) => <button key={resourceId} className={resourceId === currentResource ? 'rbc-active' : null}
                            onClick={() => setCurrentResource(resourceId)}>{resourceTitle}</button>)}
                    </div>
                </div>
            </div>
            {showModal && <CalendarModal isOpen={showModal} setIsOpen={setShowModal} data={data} />}
        </>
    )
}