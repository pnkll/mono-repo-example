import { taskApi } from '@services/TaskService'
import { withOverlay } from '../hocs/withOverlay'
import { UsersSelector } from '@src/features/entities/user/UsersSelector/index'
import { DatePicker } from '@src/shared/UiKit/DatePicker/index'
import { Formik } from 'formik'
import { useParams } from 'react-router-dom'
import s from './TaskExecutorAssign.module.scss'
import { Checkbox } from '@src/shared/UiKit/Checkbox/index'

function TaskExecutorAssign({ data, editMode = false }) {
    const { id: taskId } = useParams()
    const [updateTask] = taskApi.useAssignTaskExecutorMutation()
    const initialValues = {
        executorId: data.executor,
        auto: data.executor ? false : true,
        withoutDate: false,
        plannedDate: data.plannedDate?.ISODate
    }
    function handleSubmit(values) {
        const data = values.auto
            ? {
                taskId,
                executorId: values.executorId,
            }
            : values.withoutDate
                ? {
                    taskId,
                    executorId: values.executorId,
                    plannedDate: {
                        autoFormat: null
                    }
                }
                : {
                    taskId,
                    executorId: values.executorId,
                    plannedDate: {
                        autoFormat: values.plannedDate
                    }

                }
        updateTask(data)
    }
    function handleChangeCheckbox(func, value, name, secondName) {
        func(name, value)
        value && func(secondName, false)
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                {({ submitForm, values, handleChange, setFieldValue }) =>
                (<form onSubmit={(e) => { e.preventDefault(); submitForm() }}>
                    {(data.executor || editMode)
                        && <UsersSelector name='executorId' roleId={data.executorRole} value={values.executorId} setFieldValue={setFieldValue} readOnly={!editMode} />}
                    {editMode && <>
                        <Checkbox label='Не планировать' id='withoutDate' name='withoutDate' value={values.withoutDate} onChange={(e) => handleChangeCheckbox(setFieldValue, e.target.checked, 'withoutDate', 'auto')} />
                        {!values.withoutDate && <>
                            <Checkbox label='Автопланирование' id='auto' name='auto' value={values.auto} onChange={(e) => handleChangeCheckbox(setFieldValue, e.target.checked, 'auto', 'withoutDate')} />
                            {!values.auto
                                && <DatePicker name='plannedDate' setFieldValue={setFieldValue} value={values.plannedDate} />}
                        </>}
                        <button type='submit'>submit</button>
                    </>}
                </form>)}
            </Formik>
        </>
    )
}

export default withOverlay(TaskExecutorAssign, 'TaskExecutorAssign')