import React from "react"
import { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default React.memo(function DatePicker({ formik, id, name, placeholder, showTimeSelect, styles, timeIntervals }) {

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
            <div className={styles}>
                <ReactDatePicker className="w-[100%] text-center"
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
            </div>
        </>
    )
})