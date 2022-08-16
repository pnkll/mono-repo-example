import React from "react"
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss'

export default React.memo(function DatePicker({ formik, id, name, placeholder, showTimeSelect, timeIntervals, className, label,required }) {

    const [date, setDate] = useState()

    useEffect(() => {
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
                {label&&<label className="date-picker__label">{label}</label>}
                <ReactDatePicker className={className || "date-picker__input"}
                    required={required}
                    selected={formik.values[name]}
                    startDate={date}
                    onChange={setDate}
                    showTimeSelect={showTimeSelect}
                    timeFormat="HH:mm"
                    timeIntervals={timeIntervals}
                    dateFormat="yyyy/MM/dd HH:mm"
                    placeholderText={placeholder}
                    id={id}
                    name={name} />
                {formik.touched[name] && formik.errors[name] && <span className="date-picker__error">{formik.errors[name]}</span>}
            </div>
        </>
    )
})