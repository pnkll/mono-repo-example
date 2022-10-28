import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Input from "../../components/Input/Input.jsx";
import PhoneInput from "../../components/PhoneInput/PhoneInput.jsx";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";
import Button from "../../components/Button/Button.jsx";
import Table from "../../components/Table/Table.jsx"
import * as axios from "axios"
import './Demo.scss'
import Select from "../../components/Select/Select.jsx";
import * as yup from 'yup'
import { emailValidator, passwordValidator, phoneValidator, stringValidator } from "../../utils/yupValidation.js";
import SidebarHeaderLayout from "../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx";
import ToggleInput from "../../components/ToggleInput/ToggleInput.jsx";
import _ from "lodash";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import Preloader from "../../components/Preloader/Preloader.jsx";

export default function Demo() {

    const validationSchema = yup.object({
        email: emailValidator(true),
        password: passwordValidator(true),
        phone: phoneValidator(),
        info: stringValidator(true, 'Info'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false,
            phone: '',
            info: ''
        },
        validationSchema,
        onSubmit: values => {
            console.log(values)
        }
    });

    const [data, setData] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsCount, setItemsCount] = useState(15)
    const [totalItemsCount, setTotalItemsCount] = useState(1000)
    const [search, setSearch] = useState()

    const getPosts = async (filters) => {
        setDisabled(true)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsCount}${search ? `&${search.id}=${search.value}` : ''}`)
        setData(response.data)
        setDisabled(false)
    }
    const columns = [
        { Header: 'ID', accessor: 'id', Cell: ({ cell: { value } }) => <div style={{ width: '25px', textAlign: 'center', color: 'white', background: `#${Math.floor(100000 + Math.random() * 900000)}`, padding: '5px 0', borderRadius: '5px' }}>{value}</div> || '-' },
        { Header: 'UserId', type: 'filter', accessor: 'userId' },
        { Header: 'Title', accessor: 'title', },
        { Header: 'Body', accessor: 'body', },
    ]

    useEffect(() => {
        getPosts(search)
    }, [currentPage])
    useEffect(() => {
        setCurrentPage(1)
        search?.value !== '' ? getPosts(search) : getPosts()
    }, [search, itemsCount])
    const [filters, setFilters] = useState([
        { title: 'ID 1', status: true, },
        { title: 'ID 3', status: false, },
        { title: 'ID 2', status: false, }
    ])
    return (
        <>
                <TransitionLayout>
                    <div className="demo-page__container">
                        <form className="demo-page__form" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                            <div className="demo-page__form__elem"><Input formik={formik} id={'email'} name={'email'} type={'text'} placeholder={'Email'} label='email' /></div>
                            <div className="demo-page__form__elem"><Input formik={formik} id='password' name='password' type='password' placeholder='Password' label='password' /></div>
                            <div className="demo-page__form__elem"><PhoneInput formik={formik} id='phone' name='phone' defaultCode={7} label='Phone' /></div>
                            <div className="demo-page__form__elem"><DatePicker formik={formik} id='date' name='date' placeholder='Выберите дату' showTimeSelect={true} timeIntervals={30} /></div>
                            <div className="demo-page__form__elem"><TextArea formik={formik} id='info' name='info' placeholder='' isRequired={true} rows={5} label='Расскажите о себе' /></div>
                            <div className="demo-page__form__elem"><Select className='demo-page__form__elem__select' options={[{ label: 'jkfhdsak32j', value: '1' }, { label: 'jkfhdsakj', value: '2' }]} /></div>
                            <div className="demo-page__form__elem"><Button text='Sign in' type='submit' /></div>
                            <ToggleInput formik={formik} label='запомнить меня' id='remember' name='remember' />
                            <div className="">
                            </div>
                        </form>
                        <div className="demo-page__table">
                            {!data ? <Button text='fetch users' disabled={disabled} onClick={() => getPosts()} />
                                : <Table
                                    label='Demo table'
                                    setFilters={setFilters} filters={filters}
                                    setSearch={setSearch} search={search}
                                    data={data} columns={columns}
                                    currentPage={currentPage} setCurrentPage={setCurrentPage}
                                    itemsCount={itemsCount} setItemsCount={setItemsCount}
                                    totalItemsCount={totalItemsCount} />}
                        </div>
                    </div>
                </TransitionLayout>
        </>
    )
}