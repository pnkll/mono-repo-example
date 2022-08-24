import React, { useEffect, useState } from 'react';
import 'react-dadata/dist/react-dadata.css';
import ReactSelect from 'react-select'
import * as axios from 'axios'
import { isNil } from 'lodash';
import './InputDadata.scss'

export default React.memo(function InputDadata({formik,id,name,classNamePrefix,customStyles}) {
    const defaultStyles = customStyles || {
        container: (styles)=>({
            ...styles,
            width: '100%',
        }),
        control: (styles)=>({
            ...styles,
            background: 'white',
            height: '40px',
            borderRadius: '10px',
            outline: 'none',
            paddingLeft: '15px',
            '&:hover': {
                outline: 'none'
            }
        }),
        indicatorSeparator: (styles)=>({
            ...styles,
            display: 'none'
        }),
        valueContainer: (styles)=>({
            ...styles,
            fontSize: '16px',
            fontFamily: 'Roboto',
            fontWeight: '400',
            padding: '0'
        })
    }
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    const token = "ba87381e0edc4d37a28bc28fbdd9743859339fc1";
    const [value, setValue] = useState()
    const [options, setOptions] = useState([])
    const getData = async () => {
        const response = await axios.post(url, { query: value }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            }
        })
        response.data.suggestions.length>0&&setOptions([{ label: response.data.suggestions[0].value, value: response.data.suggestions[0].data.inn }])
    }
    useEffect(() => {
        !isNil(value)&&value.length > 5 && getData()
    }, [value])
    return (
        <>
        <div className="dadata-input__container">
            <ReactSelect noOptionsMessage={()=>'Введите ИНН'} placeholder={'Введите сообщение'} components={{DropdownIndicator:()=><></>}} styles={defaultStyles} classNamePrefix={classNamePrefix} options={options} isSearchable={true} onInputChange={setValue} value={options?options.find(option=>option.value===formik.values[id].value):''} onChange={(e)=>formik.setFieldValue(id,e)} id={id} name={name}/>
            {formik.touched[id]&&formik.errors[id]&&<p className='dadata-input__error'>{formik.errors[id]}</p>}
            </div>
        </>
    )
})