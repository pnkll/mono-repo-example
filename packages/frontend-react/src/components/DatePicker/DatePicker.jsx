import React from "react"
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss'
import ru from 'date-fns/locale/ru'
import moment from "moment/moment";

export default function DatePicker({ formik, id, name, placeholder, showTimeSelect=false, timeIntervals=30, className, label,required,format="yyyy/MM/dd HH:mm",locale=ru,formatDate, ...other }) {

    const [date, setDate] = useState(formik?.values[name])

    useEffect(() => {
        console.log(date)
        formik?.handleChange({
            target: {
                type: "change",
                id: id,
                name: name,
                value: date
            }
        })
    }, [date])
    return (
        <>
            <div className="date-picker__container">
                {label&&<label htmlFor={id} className="date-picker__label">{label}</label>}
                <ReactDatePicker className={className || "date-picker__input"}
                    required={required}
                    selected={date}
                    startDate={date}
                    onChange={setDate}
                    showTimeSelect={showTimeSelect}
                    timeFormat="HH:mm"
                    timeIntervals={timeIntervals}
                    dateFormat={format}
                    placeholderText={placeholder}
                    id={id}
                    name={name} 
                    minDate={new Date()}
                    locale={locale}
                    timeCaption='Время'
                    {...other}
                    />
                {formik?.touched[name] && formik?.errors[name] && <span className="date-picker__error">{formik?.errors[name]}</span>}
            </div>
        </>
    )
}