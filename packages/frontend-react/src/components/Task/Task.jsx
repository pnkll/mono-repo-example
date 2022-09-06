import { useFormik } from 'formik';
import React from 'react';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import TextArea from '../TextArea/TextArea.jsx';
import './Task.scss'
import InfoPopUp from '../InfoPopUp/InfoPopUp.jsx'

export default React.memo(function Task() {
    const formik = useFormik({
        initialValues: {
            taskType: '',//ID Шаблона, на основе которого сделали таск
            organization: '6315fbd3d50683eb579a29bc',//ID организации
            title: '',//Заголовок
            description: '',//Описание задачи
            executor: '', //ID исполнителя 
            AI_assigned: '',// Флаг, если true - исполнитель выбран алгоритмом, а не живым человеком
            desiredDate: '',// Желаемая дата начала исполнения задачи
            status: '',// Статус заявки, допустимые значения: ['task_created', 'task_assigned', 'task_started', 'task_in_progress', 'task_waiting_for_acceptance', 'task_closed']
            plannedDate: '',// Запланированная дата начала исполнения задачи
            fireDate: '',// Крайняя дата, по достижении которой задача должна быть выполнена,
            finishedDate: '',// Дата окончания(фактическая),
            priority: ''//от 0 до 4
            //linkedContent: '',// Массив объектов, содержащий ссылки на разные строки из таблиц(например, лицевой счёт и 2 счётчика), краткая схема:
            // {
            // TableId: {
            //     type: String,
            // },
            // contentId: {
            //     type: String,
            // }
        },
    })
    return (
        <>
            <CardLayout title={<>Заявка<InfoPopUp>Hello</InfoPopUp></>}>
                <div className="task-create__task-type-input">
                    <Select options={[{ options: [{ label: 1, value: 3 }], label: 'Авария' }, { options: [{ label: 1, value: 3 }], label: 'Авария' }, { value: 1, label: 1 }]} label='Категория' formik={formik} id='taskType' name='taskType'/>
                </div>
                <form className={`task-create__form ${formik.values.taskType!==''?'':'disabled'}`}>
                    <TextArea formik={formik} label={'Описание'} id='comment' name='comment' />
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center', padding: '10px' }}><DatePicker placeholder={'Желаемая дата'} formik={formik} id='needTime' name='needTime' />
                        <DatePicker placeholder={'Крайний срок'} formik={formik} id='lastTime' name='lastTime' />
                        <DatePicker placeholder={'Назначенная дата'} formik={formik} id='time' name='time' /></div>
                    <Select formik={formik} label={'Исполнитель'} id='executor' name='executor' />
                    <Select formik={formik} id='status' name='status' label='Статус заявки' />
                    <Select formik={formik} id='priority' name='priority' label='Степень важности' />
                </form>
            </CardLayout>
        </>
    )
})