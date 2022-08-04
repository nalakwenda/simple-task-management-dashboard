import FullCalendar from '@fullcalendar/react'
import React from 'react'
import AppLayout from '../components/Layout/AppLayout'
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'
import {data} from '../data/data';
import {useAppSelector} from '../redux/hooks';
import {projects} from '../redux/slices/ProjectsSlice';
import {Navigate, useNavigate} from 'react-router-dom';
import {TasksI} from '../types/Project';

type Props = {}





const Calendar = (props: Props) =>
{
    const navigate = useNavigate();
    const {project} = useAppSelector(projects);

    const filteredTasks = project.map((project) =>
    {
        const newTasksObject: TasksI[] = []
        const newArrayOfTasks = newTasksObject.concat.apply([], project.tasks);
        return newTasksObject.concat.apply([], project.tasks)
    }).reduce((previousValue, currentValue) =>
    {
        return previousValue.concat(currentValue)
    }, []);

    
    return (
        <AppLayout title="Calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }}
                weekends={true}
                events={
                    filteredTasks.map((tasks) =>
                    {
                        const {taskTitle, start, end} = tasks
                        return {title: taskTitle, start: new Date(start), end: new Date(end), url: `/projects` }
                    })
                   
                    // {title: 'event 2', start: '2022-07-02T08:00', end: '2022-07-02T08:00'}
                }
                // eventClick={
                //     function (args)
                //     {
                //         navigate(args.event.url)
               
                //     }
                // }
            />
        </AppLayout>
    )
}

export default Calendar