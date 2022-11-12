import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru'
import './override.scss'
import { makeControl } from "../model/makeControl";


function DatePicker({ readOnly, name, value, className, onChange, format, locale = ru, ...other }) {
    // function handleChange(value) {
    //     onChange
    //         ? onChange(value)
    //         : setFieldValue && setFieldValue(name, value)
    // }
    return (
        <>
            <div className="date-picker__container">
                <ReactDatePicker
                    className={`date-picker__input ${readOnly && 'readOnly'}`}
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
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

export default makeControl(DatePicker)