import React, { useEffect, useState } from 'react';
import Input from '../../components/Input/Input.jsx';
import { Formik} from 'formik';
import TextArea from '../../components/TextArea/TextArea.jsx';
import Select from '../../components/Select/Select.jsx';
import * as Yup from 'yup'
import { taskTypeApi } from '../../services/TaskTypeService.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRoleList } from '../../store/slices/rolesSlice.js';
import Button from '../../components/Button/Button.jsx';
import './TaskType.scss'
import { isNil } from 'lodash';
import { priorityOptions } from '../../helpers/forTask.js';

export default React.memo(function TaskType() {
    const params = useParams()
    const isNew = params.id ? false : true
    const [editMode, setEditMode] = useState(isNew ? true : false)
    const [fetchPostTaskType, { isLoading: isLoadingPost, isFetching }] = taskTypeApi.usePostTaskTypeMutation()
    const [fetchGetTaskTypeById, { data: taskType, isError, isLoading, isSuccess }] = taskTypeApi.useLazyGetTaskTypeByIdQuery()
    const [fetchUpdateTaskType, { error, isLoading: isLoadingUpdate }] = taskTypeApi.useUpdateTaskTypeMutation()

    const roleListOptions = useSelector(selectRoleList)?.map(el => el && { label: el.title, value: el._id })
    function handleSubmit(values) {
        if (editMode) {
            if (!isNew) {
                fetchUpdateTaskType({ ...values, _id: params.id })
            } else {
                fetchPostTaskType(values)
            }
        } else {
            setEditMode(!editMode)
        }
    }
    const initialValues = React.useMemo(() => !isNil(taskType)
        ? {
            title: taskType.title,
            description: taskType.description,
            priority: taskType.priority,
            executorRole: taskType.executorRole,
            controllerRole: taskType.controllerRole
        }
        : {
            title: '',
            description: '',
            priority: '',
            executorRole: '',
            controllerRole: ''
        })
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    useEffect(() => {
        if (!isNew) {
            fetchGetTaskTypeById(params.id)
        }
    }, [params])


    if (isError) {
        return <>Error</>
    } else if (isLoading) {
        <>Loading</>
    }
    return (
        (isNew ? true : isSuccess)
        && initialValues
        && <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {formik => (
                <div className="task-type__container" style={{ maxWidth: '400px' }}>
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }} style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
                        <Input formik={formik} id='title' name='title' label='Заголовок' readonly={editMode ? false : true} />
                        <div className="" style={{ display: 'flex', gap: 10 }}>
                            <Select formik={formik} defaultValue={isNew?false:true} id='executorRole' name='executorRole' label='Роль исполнителя' options={roleListOptions} isDisabled={editMode ? false : true} />
                            <Select formik={formik} defaultValue={isNew?false:true} id='controllerRole' name='controllerRole' label='Роль ответственного' options={roleListOptions} isDisabled={editMode ? false : true} />
                            <Select formik={formik} defaultValue={isNew?false:true} id='priority' name='priority' label='Степень важности' options={priorityOptions} isDisabled={editMode ? false : true} />
                        </div>
                        <TextArea formik={formik} id='description' name='description' label='Описание' readonly={editMode ? false : true} />
                        <Button text={editMode ? isNew ? 'Создать шаблон' : 'Сохранить' : 'Редактировать'} type='submit' color={editMode ? isNew ? 'green' : 'green' : 'blue'} isLoading={isLoadingPost || isLoadingUpdate} />
                    </form>
                </div>
            )}
        </Formik>
    )
})