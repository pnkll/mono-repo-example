import moment from 'moment/moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function EventsList(){

    const localizer = momentLocalizer(moment)

   return(
       <>
       <Calendar
       localizer={localizer}
       defaultDate={new Date()}
       defaultView="month"
       />
       </>
   )
}