import { useFormik } from 'formik';
import React from 'react';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import TextArea from '../TextArea/TextArea.jsx';
import './Task.scss'
import InfoPopUp from '../InfoPopUp/InfoPopUp.jsx'
import AutoTextArea from '../AutoTextArea/AutoTextArea.jsx';
import { taskTypeApi } from '../../services/TaskTypeService.js';
import { useSelector } from 'react-redux';
import { rolesApi } from '../../services/RolesService.js';
import { priorityOptions } from '../../helpers/forTask.js';
import { useState } from 'react';
import { isNil } from 'lodash';
import Button from '../Button/Button.jsx';
import { usersApi } from '../../services/UsersService.js';
import { useEffect } from 'react';

export default React.memo(function Task() {
    //'632b2c90050946e0628bc7fb,632db358a457c421276b7a86'
    const {data: taskTypes,error}=taskTypeApi.useGetTaskTypesForSelectorQuery()
    const [getUsersIdsByRoleId, {data: ids}]=rolesApi.useLazyGetUsersByRoleIdQuery()
    const [getUsersById,{data: users}]=usersApi.useLazyGetUsersByIdQuery()
    const [executorOptions,setExecutorOptions]=useState(null)
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
            priority: '',
            files: [[{name: 'Название файла'}],[{name: 'Название файла'}]],//от 0 до 4
            //linkedContent: '',// Массив объектов, содержащий ссылки на разные строки из таблиц(например, лицевой счёт и 2 счётчика), краткая схема:
            // {
            // TableId: {
            //     type: String,
            // },
            // contentId: {
            //     type: String,
            // }
        },
        onSubmit: values=> console.log(values)
    })
    async function setExecutorRole(role_id){
        await getUsersIdsByRoleId(role_id)
        .then(({data})=>getUsersById(data.message))
        .then(({data})=>setExecutorOptions(data.message.map(el=>el?{label: `${el.firstname} ${el.lastname}`, value: el._id}:el)))
    }
    const [keyOfSelect,setKeyOfSelect]=useState(1)
    async function setTemplate(id){
        const taskType = taskTypes.find(el=>el.value===id)
        formik.setFieldValue('taskType', id)
        formik.setFieldValue('priority',taskType.data.priority)
        setExecutorRole(taskType.data.executorRole)
        setKeyOfSelect(keyOfSelect+1)
    }
    return (
        <>
            <CardLayout title={<>Заявка<InfoPopUp><p>Описание карточки</p></InfoPopUp></>}>
                <div className="task-create__task-type-input">
                    <Select options={taskTypes} label='Категория' id='taskType' name='taskType' handleChange={setTemplate}/>
                </div>
                <form className={`task-create__form ${formik.values.taskType!==''?'':'disabled'}`} onSubmit={(e)=>{e.preventDefault();formik.submitForm()}}>
                    <TextArea formik={formik} label={'Описание'} id='description' name='description' maxLength={250} maxRows={6} minRows={4} withAttach={true} attachId='files'/>
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center', padding: '10px' }}>
                        <DatePicker placeholder={'Желаемая дата'} formik={formik} id='needTime' name='needTime' showTimeSelect={true}/>
                        <DatePicker placeholder={'Крайний срок'} formik={formik} id='lastTime' name='lastTime' showTimeSelect={true}/>
                        <DatePicker placeholder={'Назначенная дата'} formik={formik} id='time' name='time' showTimeSelect={true}/></div>
                    <Select formik={formik} label={'Исполнитель'} id='executor' name='executor' options={executorOptions}/>
                    <Select formik={formik} id='status' name='status' label='Статус заявки' />
                    <Select key={keyOfSelect} formik={formik} id='priority' options={priorityOptions} hasDefaultValue={formik.values.taskType!==''?true:false} name='priority' label='Степень важности' />
                    <Button color={'green'} text='Создать заявку' type='submit'/>
                </form>
            </CardLayout>
        </>
    )
})