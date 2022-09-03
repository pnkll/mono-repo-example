import {useFormik} from 'formik';
import React from 'react';
import Input from "../components/Input/Input";

export default React.memo(function ProfileForm() {
    const formik = useFormik({
        initialValues: {},
        onSubmit: {}
    })
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit()
            }}>
                <Input formik={formik} label={'Username'} id={'username'} name={'username'}/>
                <Input formik={formik} label={'First name'} id={'firstname'} name={'firstname'}/>
                <Input formik={formik} label={'Last name'} id={'lastname'} name={'lastname'}/>
                <Input formik={formik} label={'Organization'} id={'organization'} name={'organization'}/>
                <Input formik={formik} label={'Phone'} id={'phone'} name={'phone'}/>
            </form>
        </>
    )
})