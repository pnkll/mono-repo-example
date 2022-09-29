import { Formik, useFormik } from 'formik';
import React from 'react';
import CardLayout from '../../page_layouts/CardLayout/CardLayout.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import Input from '../Input/Input.jsx';
import Select from '../Select/Select.jsx';
import TextArea from '../TextArea/TextArea.jsx';
import s from './Task.module.scss'
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
import { selectCurrentUser } from '../../store/slices/userSlice.js';
import moment from 'moment/moment.js';
import { taskApi } from '../../services/TaskService.js';

export default React.memo(function Task() {
    //'632b2c90050946e0628bc7fb,632db358a457c421276b7a86'
    const { data: taskTypes, error } = taskTypeApi.useGetTaskTypesForSelectorQuery()
    const [getUsersIdsByRoleId] = rolesApi.useLazyGetUsersByRoleIdQuery()
    const [getUsersById] = usersApi.useLazyGetUsersByIdQuery()
    const [postTask]=taskApi.usePostTaskMutation()
    const [executorOptions, setExecutorOptions] = useState(null)
    const [keyOfSelect, setKeyOfSelect] = useState(0)
    const organization = useSelector(selectCurrentUser)?.organization
    const [taskType,setTaskType]=useState(null)
    const initialValues = React.useMemo(() => keyOfSelect < 1
        ? {
            taskType: '',//ID Шаблона, на основе которого сделали таск
            organization: organization,//ID организации
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
            files: [[{ name: 'Название файла' }], [{ name: 'Название файла' }]],//от 0 до 4}
        }
        : {
            taskType: taskType._id,
            organization: organization,
            title: '',
            description: '',
            executor: '', 
            AI_assigned: '',
            desiredDate: '',
            status: '',
            plannedDate: '',
            fireDate: '',
            finishedDate: '',
            priority: taskType.priority,
            files: [[{ name: 'Название файла' }], [{ name: 'Название файла' }]],
            status: 'task_created'
        })
    async function setExecutorRole(role_id) {
        await getUsersIdsByRoleId(role_id)
            .then(({ data }) => getUsersById(data.message))
            .then(({ data }) => setExecutorOptions(data.message.map(el => el ? { label: `${el.firstname} ${el.lastname}`, value: el._id } : el)))
    }

    async function setTemplate(id) {
        const taskType = taskTypes.find(el => el.value === id)?.data
        await setExecutorRole(taskType.executorRole)
        setKeyOfSelect(keyOfSelect + 1)
        setTaskType(taskType)
    }
    function handlePost(values){
        const arr = Object.keys(values).map((el,index)=>el&&{[el]:Object.values(values)[index]})
        console.log(arr)
        console.log(arr.reduce((prev,item)=>{
            console.log(Object.values(item))
            if((Object.values(item)[0])!==''){
            return {...prev,[Object.keys(item)[0]]: Object.values(item)[0]}
            }
        },{}))
    }
    return (
        <>
            <CardLayout title={<>Заявка<InfoPopUp><p>Описание карточки</p></InfoPopUp></>}>
                <div className={s["task-create__task-type-input"]}>
                    <Select options={taskTypes} label='Категория' id='taskType' name='taskType' handleChange={setTemplate} />
                </div>
                <Formik key={keyOfSelect} initialValues={initialValues} onSubmit={handlePost}>
                    {formik => (
                        <form className={`${s['task-create__form']} ${!isNil(taskType) ? '' : s['disabled']}`} onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                            <Input formik={formik} label='Название' id='title' name='title'/>
                            <TextArea formik={formik} label={'Описание'} id='description' name='description' maxLength={250} maxRows={6} minRows={4} withAttach={true} attachId='files' />
                            <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center', padding: '10px' }}>
                                <DatePicker placeholder={'Желаемая дата'} formik={formik} id='plannedDate' name='plannedDate' showTimeSelect={true} />
                                <DatePicker placeholder={'Крайний срок'} formik={formik} id='fireDate' name='fireDate' showTimeSelect={true} />
                                <DatePicker placeholder={'Назначенная дата'} formik={formik} id='finishedDate' name='finishedDate' showTimeSelect={true} /></div>
                            <Select formik={formik} defaultValue={true} label={'Исполнитель'} id='executor' name='executor' options={executorOptions} />
                            <Select formik={formik} id='status' name='status' label='Статус заявки' />
                            <Select formik={formik} defaultValue={true} id='priority' options={priorityOptions} name='priority' label='Степень важности' />
                            <Button color={'green'} text='Создать заявку' type='submit' />
                        </form>)}
                </Formik>
            </CardLayout>
        </>
    )
})