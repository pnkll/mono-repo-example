import React from "react";
import { useFormik } from "formik";
import Input from "../components/Input/Input.jsx";
import PhoneInput from "../components/PhoneInput/PhoneInput.jsx";
import DatePicker from "../components/DatePicker/DatePicker.jsx";
import TextArea from "../components/TextArea/TextArea.jsx";

export default React.memo(function Form() {

    const validate = values => {
        const errors = {};

        if (!values.password) {
            errors.password = 'Please fill in your password';
        } else if (values.password.length < 8) {
            errors.password = 'Must be 8 characters or more';
        }

        if (!values.email || values.email === 'Email') {
            errors.email = 'Please fill in your email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.phone) {
            errors.phone = 'Please fill phone'
        } else if (values.phone.length < 14 || values.phone.split('').find(el => el === '_')) {
            errors.phone = 'Pleease fill this'
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            phone: '',
        },
        validate,
        onSubmit: values => {
            console.log(values)
        }
    });


    return (
        <>
            <div className="flex justify-center">
                <form className="w-[500px]" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} style={{width: "500px"}}>
                    <Input formik={formik} id={'email'} name={'email'} type={'text'} placeholder={'Email'} label='email' />
                    <Input formik={formik} id='password' name='password' type='password' placeholder='Password' label='password'/>
                    <PhoneInput formik={formik} id='phone' name='phone' defaultCode={7} label='Phone' />
                    <DatePicker formik={formik} id='date' name='date' placeholder='Выберите дату' showTimeSelect={true} timeIntervals={30}/>
                    <TextArea formik={formik} id='info' name='info' placeholder=' ' isRequired={false} rows={5} />
                    <button className='auth__form-submit' type="submit" >Sign In</button>
                </form>
            </div>
        </>
    )
})