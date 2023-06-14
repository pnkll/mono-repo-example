import React, { useEffect, useState } from "react";
import Select from "../Select/Select.jsx";
import MaskInput from "../MaskInput/MaskInput.jsx";
import { GlobeAltIcon } from "@heroicons/react/solid";
import './PhoneInput.scss'

export default React.memo(function PhoneInput({ formik, label, name, id, defaultMask, defaultCode, required, error }) {

    const [mask, setMask] = useState(defaultMask ? defaultMask : '999 999 9999')
    const [code, setCode] = useState(defaultCode)
    const [number, setNumber] = useState('')
    const [inputWidth, setInputWidth] = useState(98)

    useEffect(() => {
        formik.handleChange({
            target: {
                type: "change",
                id: id,
                name: name,
                value: code + ' ' + number
            }
        })
        String(code).length === 3 ? setInputWidth(89) : String(code).length > 3 ? setInputWidth(80) : setInputWidth(98)
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

    let selectStyles = {
        option: (provided, state) => ({

        }),
        control: (formik) => ({
            borderRadius: '4px 0 0 4px',
            display: 'flex',
            border: '1px solid #B8BBC6',
            borderRight: '0px',
            height: '30px',
            cursor: 'pointer'
        }),
        menu: (styles) => ({
            ...styles,

        }),
        menuList: (styles) => ({
            ...styles,
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            width: '0px'
        }),
        indicatorsContainer: (styles) => ({
            ...styles,
            paddingRight: '8px'
        })
    }
    const [hel, setHel] = useState(false)
    return (
        <>
            <div className="phone-input">
                <label onClick={() => setHel(!hel)} className="phone-input__label">{label} {required && '*'}</label>
                <div className="" style={{ display: "flex" }}>
                    <Select
                        classNamePrefix={formik.errors[name] && formik.touched[name] ? 'error-phone' : 'phone'}
                        defaultValue={codeList.find(el => el.value === defaultCode)}
                        options={codeList}
                        handleChange={handleChange}
                        customStyles={selectStyles}
                        indicator={<GlobeAltIcon width={15} />} 
                        hasDefaultValue={true}/>
                    <MaskInput formik={formik} id={id} name={name} mask={mask} handleChange={setNumber} value={number} className='phone-input__field' placeholder='' styles={{ width: inputWidth + 'px' }} /></div>
                {formik.touched[name] && formik.errors[name] && <p className="phone-input__error">{formik.errors[name]}</p>}
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