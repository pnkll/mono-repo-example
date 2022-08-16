import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Input from "../components/Input/Input.jsx";
import PhoneInput from "../components/PhoneInput/PhoneInput.jsx";
import DatePicker from "../components/DatePicker/DatePicker.jsx";
import TextArea from "../components/TextArea/TextArea.jsx";
import Button from "../components/Button/Button.jsx";
import Table from "../components/Table/Table.jsx"
import * as axios from "axios"
import './Demo.scss'
import Select from "../components/Select/Select.jsx";

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

    const [data, setData] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsCount, setItemsCount] = useState(5)
    const [totalItemsCount, setTotalItemsCount] = useState(1000)
    const getPosts = async () => {
        setDisabled(true)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsCount}`)
        setData(response.data)
        setDisabled(false)
    }
    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'UserID', accessor: 'userId' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Body', accessor: 'body' }
    ]

    useEffect(() => {
        getPosts()
    }, [currentPage])

    return (
        <>
            <div className="demo-page__container">
                    <form className="demo-page__form" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} style={{ width: "500px" }}>
                        <div className="demo-page__form__elem"><Input formik={formik} id={'email'} name={'email'} type={'text'} placeholder={'Email'} label='email' /></div>
                        <div className="demo-page__form__elem"><Input formik={formik} id='password' name='password' type='password' placeholder='Password' label='password' /></div>
                        <div className="demo-page__form__elem"><PhoneInput formik={formik} id='phone' name='phone' defaultCode={7} label='Phone' /></div>
                        <div className="demo-page__form__elem"><DatePicker formik={formik} id='date' name='date' placeholder='Выберите дату' showTimeSelect={true} timeIntervals={30} /></div>
                        <div className="demo-page__form__elem"> <TextArea formik={formik} id='info' name='info' placeholder=' ' isRequired={false} rows={5} /></div>
                        <div className="demo-page__form__elem"> <Button text='Sign in' type='submit'/></div>
                        <div className="demo-page__form__elem"><Select className='demo-page__form__elem__select' options={[{label: 'jkfhdsakj', value:''},{label: 'jkfhdsakj', value:''}]}/></div>
                        <div><Button text='Home' href={'/'} /></div>
                    </form>
                <div className="demo-page__table">
                    {!data ? <Button text='fetch users' disabled={disabled} onClick={() => getPosts()} />
                        : <Table data={data} columns={columns} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsCount={itemsCount} totalItemsCount={totalItemsCount} />}
                </div>
            </div>
        </>
    )
})