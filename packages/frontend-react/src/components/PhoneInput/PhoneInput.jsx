import React, { useEffect, useState } from "react";
import Select from "react-select";
import MaskInput from "../MaskInput/MaskInput.jsx";

export default React.memo(function PhoneInput({formik,label,name,id, defaultMask, defaultCode }) {

    const [mask, setMask] = useState(defaultMask?defaultMask:'999 999 9999')
    const [code, setCode] = useState(defaultCode)
    const [number, setNumber] = useState('')

    useEffect(() => {
        formik.handleChange({target: {
            type: "change",
            id: id,
            name: name,
            value: code + ' ' + number
          }})
    }, [code, number])

    function calcMask(code) {

        const arr = String(code).split('')

        for (let i = 0; i < 13 - String(code).length; i++) {
            i == 4 - String(code).length || i === 8 - String(code).length ? arr.push(' ') : arr.push(9)
        }
        setMask(arr.slice(String(code).length).join(''))
    }

    function handleChange({ value, label }) {
        calcMask(value)
        setNumber('')
        setCode(label)
    }

    return (
        <>
            <div className="flex flex-col">
                <label>{label}</label>
                <div className="" style={{display: "flex"}}><Select classNamePrefix={'phone_input'} defaultValue={codeList.find(el => el.value === defaultCode)} options={codeList} onChange={handleChange} />
                <MaskInput formik={formik} id={id} name={name} mask={mask} handleChange={setNumber} value={number} /></div>
                {formik.touched[name]&&formik.errors[name]&&<div style={{color: "red"}}>{formik.errors[name]}</div>}
            </div>
        </>
    )
})

export const codeList = [
    { en: "Afghanistan", ru: "Афганистан", label: '+93', value: 93 },
    { en: "Albania", ru: "Албания", label: '+355', value: 355 },
    { en: "Algeria", ru: "Алжир", label: '+1', value: 1 },
    { en: "American Samoru: a", ru: "Американское Самоа", label: '+684', value: 684 },
    { en: "Russia", ru: "Россия", label: '+7', value: 7 },
]