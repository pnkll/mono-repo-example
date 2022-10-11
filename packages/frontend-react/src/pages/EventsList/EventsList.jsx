import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from 'react-router-dom';
import 'moment/locale/ru';
import BigCalendar from '../../components/BigCalendar/BigCalendar';

export default function EventsList() {


    


    const navigate = useNavigate()

    const events = React.useMemo(() =>
        tasks.map(task => task && {
            start: task.plannedDate,
            end: task.plannedDate,
            description: task.description,
            allDay: true,
            resourceId: 'task',
            title: <span onClick={() => navigate(`../tasks/${task._id}`)}>{task.title}</span>
        })
        , [tasks])
    return (
        <>
            <BigCalendar
                events={events}
                selectable
            />
        </>
    )
}
















export const tasks = [
    {
        "_id": "633bfd052de66600db167767",
        "organization": "632b2bde1e18d5955b6cd62a",
        "taskType": "63342abbd23e0685a6d1d9fb",
        "title": "Устранить утечку",
        "description": "default_task_description",
        "executor": "632b2db1050946e0628bc835",
        "AI_assigned": false,
        "status": "task_created",
        "priority": 2,
        "linkedContent": [],
        "fireDate": "2022-10-15T09:29:41.845Z",
        "finishedDate": "2022-10-14T09:29:41.845Z",
        "plannedDate": "2022-10-13T09:29:41.845Z",
        "createdAt": "2022-10-04T09:29:41.845Z",
        "updatedAt": "2022-10-04T09:29:41.845Z",
        "requiredTime": 60
    },
    {
        "_id": "633bfd052de66600db167767",
        "organization": "632b2bde1e18d5955b6cd62a",
        "taskType": "63342abbd23e0685a6d1d9fb",
        "title": "Поменять трубы",
        "description": "default_task_description",
        "executor": "632b2db1050946e0628bc835",
        "AI_assigned": false,
        "status": "task_created",
        "priority": 2,
        "linkedContent": [],
        "fireDate": "2022-10-18T09:29:41.845Z",
        "finishedDate": "2022-10-17T09:29:41.845Z",
        "plannedDate": "2022-10-16T09:29:41.845Z",
        "createdAt": "2022-10-04T09:29:41.845Z",
        "updatedAt": "2022-10-04T09:29:41.845Z",
        "requiredTime": 60
    },
    {
        "_id": "633bfd052de66600db167767",
        "organization": "632b2bde1e18d5955b6cd62a",
        "taskType": "63342abbd23e0685a6d1d9fb",
        "title": "Сверить счетчики",
        "description": "default_task_description",
        "executor": "632b2db1050946e0628bc835",
        "AI_assigned": false,
        "status": "task_created",
        "priority": 2,
        "linkedContent": [],
        "fireDate": "2022-10-15T09:29:41.845Z",
        "finishedDate": "2022-10-14T09:29:41.845Z",
        "plannedDate": "2022-10-13T09:29:41.845Z",
        "createdAt": "2022-10-04T09:29:41.845Z",
        "updatedAt": "2022-10-04T09:29:41.845Z",
        "requiredTime": 60
    },
    {
        "_id": "633bfd052de66600db167767",
        "organization": "632b2bde1e18d5955b6cd62a",
        "taskType": "63342abbd23e0685a6d1d9fb",
        "title": "Малярка",
        "description": "Покрасить подъезд",
        "executor": "632b2db1050946e0628bc835",
        "AI_assigned": false,
        "status": "task_created",
        "priority": 2,
        "linkedContent": [],
        "fireDate": "2022-10-15T09:29:41.845Z",
        "finishedDate": "2022-10-11T09:56:41.845Z",
        "plannedDate": "2022-10-11T09:29:41.845Z",
        "createdAt": "2022-10-04T09:29:41.845Z",
        "updatedAt": "2022-10-04T09:29:41.845Z",
        "requiredTime": 60
    }
]