import React from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
//import s from './DatePicker.module.scss'
import ru from 'date-fns/locale/ru'
import classNames from "classnames/bind";
import './override.scss'
import { isNil } from "lodash";


export default function DatePicker({ readOnly, name, value, className, setFieldValue, onChange, format, locale = ru, ...other }) {
    function handleChange(value) {
        onChange
            ? onChange(value)
            : setFieldValue && setFieldValue(name, value)
    }
    // const select=value&&new Date(value)
    // console.log(select)
    return (
        <>
            <div className="date-picker__container">
                <ReactDatePicker
                    className={`date-picker__input ${readOnly && 'readOnly'}`}
                    selected={value ? new Date(value) : null}
                    //selected={}
                    onChange={handleChange}
                    timeFormat="HH:mm"
                    dateFormat={format || "yyyy/MM/dd HH:mm"}
                    minDate={new Date()}
                    locale={locale}
                    timeCaption='Время'
                    readOnly={readOnly}
                    {...other}
                />
            </div>
        </>
    )
}
