import React from "react";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import Select from '../../components/Select/Select'
import Multiselect from "multiselect-react-dropdown";
import { setResumable, UploadContext } from "../../Providers/UploadNotify.jsx";
import DatePicker from "../../components/DatePicker/DatePicker.jsx";
import { useFormik } from "formik";
import moment from "moment";
import UserSelectorbyRole from "../../components/UserSelectorByRole/UserSelectorByRole.jsx";

export default function Main() {

    const formik = useFormik({
        initialValues: {
            date: new Date()
        }
    })
    // console.log('moment',moment('2022-10-16T09:29:41.845Z').format())
    // console.log('date', new Date('2022-10-16T09:29:41.845Z'))
    return (
        <>
            <TransitionLayout>
                main
                <DatePicker formik={formik} id='date' name='date'/>
                <UserSelectorbyRole roleId={'632b2bde8cbdc749d419e397'}/>
            </TransitionLayout>
        </>
    )
}