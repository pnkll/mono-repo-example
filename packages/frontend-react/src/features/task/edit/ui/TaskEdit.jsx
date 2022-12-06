import { initialTaskModel } from '@src/entities/task/index'
import { useStore } from 'effector-react'
import { Field, Form, Formik } from 'formik'
import s from './TaskEdit.module.scss'

export function TaskEdit() {
    const task = useStore(initialTaskModel.$taskDetails)
    return (
        <>
            <div className={s.container}>
                <Formik>
                    {({ submitForm }) => <Form onSubmit={e => { e.preventDefault(); submitForm() }}>
                        <Field/>
                    </Form>}
                </Formik>
            </div>
        </>
    )
}