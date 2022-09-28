import React, { useEffect, useState } from 'react';
import Input from '../Input/Input.jsx';
import { useFormik } from 'formik';
import TextArea from '../TextArea/TextArea.jsx';
import Select from '../Select/Select.jsx';
import * as Yup from 'yup'
import { taskTypeApi } from '../../services/TaskTypeService.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoleList } from '../../store/slices/rolesSlice.js';
import Button from '../Button/Button.jsx';
import './TaskType.scss'
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import { isNil } from 'lodash';
import { priorityOptions } from '../../helpers/forTask.js';
import { addNotify } from '../../store/slices/notificationsSlice.js';

export default React.memo(function TaskType() {
    const [fetchError,setFetchError]=useState(null)
    const dispatch=useDispatch()
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    const formik = useFormik({
        initialValues: {
            organization: '6315fbd3d50683eb579a29bc',
            title: '',// Стандартный заголовок req
            description: '',// Описание req
            executorRole: '',// ID роли, сотрудники которой должны выполнить задание, req
            controllerRole: '',// ID роли, сотрудники которой имеют право подтверждать выполнение задания req
            requiredTime: 60,
            //requiredTime: '',// Необходимое время для выполнения задачи (в минутах) 
            //linkedContent: '',
            //deadLineHours: '',
            priority: ''// Стандартный приоритет задачи (от 0 до 4 включительно)
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            if (editMode) {
                if (!isNil(params.id)) {
                    updateTaskType({...values,_id: params.id})
                } else {
                    postTaskType(values)
                }
            } else {
                setEditMode(true)
            }
        }
    })
    const params = useParams()
    const [editMode, setEditMode] = useState(isNil(params.id)? true : false)
    const [fetchPostTaskType, { isLoading: isLoadingPost, isFetching }] = taskTypeApi.usePostTaskTypeMutation()
    const [fetchGetTaskTypeById, {isError,isLoading,isSuccess}] = taskTypeApi.useLazyGetTaskTypeByIdQuery()
    const [fetchUpdateTaskType,{error,isLoading: isLoadingUpdate}] = taskTypeApi.useUpdateTaskTypeMutation()
    async function getTaskTypeById(id) {
        const { data } = await fetchGetTaskTypeById(id)
        if (data?.status === 200) {
            const values = data.message[0]
            formik.setFieldValue('title', values.title)
            formik.setFieldValue('description', values.description)
            formik.setFieldValue('priority', values.priority)
            formik.setFieldValue('executorRole', values.executorRole)
            formik.setFieldValue('controllerRole', values.controllerRole)
        }
    }
    async function postTaskType(values) {
        const {data,error} = await fetchPostTaskType(values)
        //error?showError(error.data.errors):setEditMode(false)
        error?dispatch(addNotify({type: 'error', message:error.data.errors})):setEditMode(false)
    }
    async function updateTaskType(values) {
        const {data,error} = await fetchUpdateTaskType(values)
        //error?showError(error.data.errors):setEditMode(false)
        error?dispatch(addNotify({type: 'error', message:error.data.errors})):setEditMode(false)
    }
    const roleListOptions = useSelector(selectRoleList)?.map(el => el && { label: el.title, value: el._id })
    useEffect(() => {
        if (params.id) {
            getTaskTypeById(params.id)
        }
    }, [params])
    if(isError){
        return <>Error</>
    } else if(isLoading){
        <>Loading</>
    }
    return (
        <>{(!isNil(params.id)?isSuccess:true)&&
            <div className="task-type__container" style={{ maxWidth: '400px' }}>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} style={{ display: 'flex', flexDirection: 'column', gap: 10,position: 'relative' }}>
                    <Input formik={formik} id='title' name='title' label='Заголовок' readonly={editMode?false:true}/>
                    <div className="" style={{ display: 'flex', gap: 10 }}>
                        <Select formik={formik} id='executorRole' name='executorRole' label='Роль исполнителя' options={roleListOptions} hasDefaultValue={!isNil(params.id)?true:false} isDisabled={editMode?false:true}/>
                        <Select formik={formik} id='controllerRole' name='controllerRole' label='Роль ответственного' options={roleListOptions} hasDefaultValue={!isNil(params.id)?true:false} isDisabled={editMode?false:true}/>
                        {/* <Select formik={formik} id='linkedContent' name='linkedContent' label='Необходимо для завершения задачи'/> */}
                        <Select formik={formik} id='priority' name='priority' label='Степень важности' options={priorityOptions} hasDefaultValue={!isNil(params.id)?true:false} isDisabled={editMode?false:true}/>
                    </div>
                    <TextArea formik={formik} id='description' name='description' label='Описание' readonly={editMode?false:true}/>
                    <Button text={editMode ? isNil(params.id)? 'Создать шаблон' : 'Сохранить' : 'Редактировать'} type='submit' color={editMode ? isNil(params.id)? 'green' : 'green' : 'blue'} isLoading={isLoadingPost||isLoadingUpdate}/>
                    {fetchError&&<ErrorMessage message={fetchError}/>}
                </form>
            </div>}
        </>
    )
})