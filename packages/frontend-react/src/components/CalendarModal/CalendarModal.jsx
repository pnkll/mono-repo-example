import { Formik } from 'formik';
import { isNil } from 'lodash';
import moment from 'moment';
import React from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { priorityOptions } from '../../helpers/forTask';
import { rolesApi } from '../../services/RolesService';
import { taskApi } from '../../services/TaskService';
import { taskTypeApi } from '../../services/TaskTypeService';
import { usersApi } from '../../services/UsersService';
import { selectCurrentUser } from '../../store/slices/userSlice';
import Button from '../Button/Button';
import DatePicker from '../DatePicker/DatePicker';
import Input from '../Input/Input';
import Select from '../Select/Select'
import TextArea from '../TextArea/TextArea';

export default function CalendarModal({ isOpen, setIsOpen, data }) {
    ReactModal.setAppElement('#root')

    const [getTaskTypes, { data: taskTypes, error }] = taskTypeApi.useLazyGetTaskTypesForSelectorQuery()
    const [getUsersIdsByRoleId] = rolesApi.useLazyGetUsersByRoleIdQuery()
    const [getUsersById] = usersApi.useLazyGetUsersByIdQuery()
    const [postTask, { isFetching, isSuccess }] = taskApi.usePostTaskMutation()

    const customStyles = {
        overlay: { zIndex: 100 },
        content: {
            inset: '50% auto auto 50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '50vh',
            height: '50vh'
        }
    }
    const options = React.useMemo(() => [
        { label: 'Создать обращение', value: 'task' },
        { label: 'Создать задачу', value: 'task' }
    ], [])
    const [type, setType] = React.useState(null)
    const [formConfig, setFormConfig] = React.useState(null)
    const [keyOfSelect, setKeyOfSelect] = React.useState(0)
    const [taskType, setTaskType] = React.useState(null)
    const [executorOptions, setExecutorOptions] = React.useState(null)
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
    React.useEffect(() => {
        if (type === 'task') {
            getTaskTypes()
        }
    }, [type])
    const organization = useSelector(selectCurrentUser)?.organization
    React.useEffect(() => {
        !isNil(taskType) && setFormConfig({
            initialValues: {
                taskType: taskType._id,
                organization: organization,
                title: '',
                description: '',
                executor: '',
                AI_assigned: '',
                desiredDate: '',
                status: '',
                plannedDate: new Date(data.start),
                fireDate: '',
                finishedDate: new Date(data.end),
                priority: taskType.priority,
                files: '',
                status: ''
            }
        })
    }, [taskType])
    async function handlePost(values) {
        console.log(moment(values.plannedDate).format('DD.MM.YYYY'))
        const body = Object.keys({ ...values })
            .map((el, index) => {
                if (el && Object.values(values)[index] !== '') {
                    return { [el]: Object.values(values)[index] }
                }
            })
            .filter(el => el)
            .reduce((prev, item) => {
                return { ...prev, [Object.keys(item)[0]]: Object.values(item)[0] }
            }, {})
        const { status } = await postTask({
            ...body,
            //plannedDate: moment(values.plannedDate).format('DD.MM.YYYY'), finishedDate: moment(values.finishedDate).format('DD.MM.YYYY'),fireDate: moment(values.fireDate).format('DD.MM.YYYY')
        })
    }
    React.useEffect(() => {
        isSuccess && setIsOpen(false)
    }, [isSuccess])

    if (isFetching) {
        return <>Preloader</>
    }

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}>
                <Select options={options} handleChange={setType} />
                {!isNil(type) && !isNil(taskTypes) &&
                    <Select options={taskTypes} label='Категория' id='taskType' name='taskType' handleChange={setTemplate} />
                }
                {!isNil(formConfig) &&
                    <Formik key={keyOfSelect} initialValues={formConfig?.initialValues} onSubmit={handlePost}>
                        {formik => (
                            <form onSubmit={(e) => { e.preventDefault(); formik.submitForm() }}>
                                <Input name={'title'} id={'title'} formik={formik} label={'Название'} />
                                <TextArea formik={formik} label={'Описание'} id='description' name='description' maxLength={250} maxRows={6} minRows={4} withAttach={true} attachId='files' />
                                <div className="" style={{ display: 'flex' }}>
                                    <DatePicker placeholder={'Желаемая дата'} formik={formik} id='plannedDate' name='plannedDate' showTimeSelect={true} formatDate={'DD.MM.YYYY hh:mm'} />
                                    <DatePicker placeholder={'Крайний срок'} formik={formik} id='fireDate' name='fireDate' showTimeSelect={true} />
                                    <DatePicker placeholder={'Назначенная дата'} formik={formik} id='finishedDate' name='finishedDate' showTimeSelect={true} />
                                </div>
                                <Select formik={formik} defaultValue={true} id='priority' options={priorityOptions} name='priority' label='Степень важности' />
                                <Select formik={formik} defaultValue={true} label={'Исполнитель'} id='executor' name='executor' options={executorOptions} />
                                <Select formik={formik} id='status' name='status' label='Статус заявки' />
                                <Button type='submit' text='Создать задачу' />
                            </form>)}
                    </Formik>
                }
            </ReactModal>
        </>
    )
}