import { PaperClipIcon, XIcon } from "@heroicons/react/outline";
import { isEmpty } from "lodash";
import { isNil } from "lodash";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import './TextArea.scss'

export default function TextArea({ formik, id, name, label, required, placeholder, maxLength = 100, minRows = 3, maxRows = 5, withAttach = false, attachId,readonly=false }) {
    const onBlur = (e) => {
        if (e.target.value.length == 0)
            document.getElementById(id + "-label").className = `${formik.submiCount > 0 && formik.errors[name] ? 'text-red-700' : 'text-gray-700'}  absolute text-sm duration-300 transform -translate-y-6  top-3 -z-10 origin-[0] left-0  translate-y-0 scale-15 -translate-y-6`;
    }
    const onFocus = (e) => {
        if (document.getElementById(id + "-label"))
            document.getElementById(id + "-label").className = `absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-3 -z-10 origin-[0]   ${formik.submiCount > 0 && formik.errors[name] ? 'text-red-700' : 'text-[#6495ed]'}`;

    }
    function handleRemove(idx){
        formik.setFieldValue(attachId,formik.values[attachId].filter((el,index)=>index!==idx))
    }
    return (
        <div className="textarea__container"
        //className="relative z-0 mb-6 w-full group"
        >
            {label && <label className="textarea__label">{label} {required && '*'}
            </label>}
            {/* <textarea
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => onBlur(e)}
                    onInput={(e) => onFocus(e)}
                    rows={rows || 3}
                    className='textarea__input'
                    //{`${formik.submitCount>0 && formik.errors[name] ? 'border-red-900' :''} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#6495ed]`}
                    id={id}
                    name={name}
                    value={formik.values[id]}
                    placeholder={placeholder}
                    onChange={formik.handleChange} /> */}
            <div className="textarea__wrapper">
                <ReactTextareaAutosize
                    className='textarea__input'
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => onBlur(e)}
                    onInput={(e) => onFocus(e)}
                    id={id}
                    name={name}
                    value={formik.values[id]}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    maxLength={maxLength}
                    minRows={minRows}
                    maxRows={maxRows}
                    readOnly={readonly}
                />
                {!isEmpty(formik?.values[attachId]) && <div className="textarea__files-preview__container">
                    <hr />
                    <div className="textarea__files-preview__wrapper">
                        {formik?.values[attachId].map((file, index) => <div key={index} className="textarea__files-preview__elem">
                            <i className="textarea__files-preview__elem__icon"/>
                            <XIcon width={20} className="textarea__files-preview__elem__x-icon" onClick={()=>handleRemove(index)}/>
                            {file[0].name}
                        </div>
                        )}</div>
                </div>}
                {!readonly&&<span className="textarea__length">{formik?.values[id].length}/{maxLength}</span>}
                {withAttach && !readonly&&<label className="textarea__attach-file">
                    <PaperClipIcon width={20} className="textarea__attach-file__icon" />
                    <input type='file' style={{ width: 0, height: 0 }} onChange={(e) => formik.setFieldValue(attachId, [...formik.values[attachId], e.target.files])} />
                </label>}
            </div>


            {!isNil(formik.errors[name]) && <p className="textarea__error">{formik.submitCount > 0 && formik.errors[name] && formik.errors[name]}</p>}

        </div>
    )
}