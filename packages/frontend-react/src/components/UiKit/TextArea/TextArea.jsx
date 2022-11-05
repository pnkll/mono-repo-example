import { PaperClipIcon, XIcon } from "@heroicons/react/outline";
import { isEmpty } from "lodash";
import { isNil } from "lodash";
import React from "react";
import TextAreaAutosize from "@components/UiKit/TextArea/TextAreaAutoSize/TextAreaAutoSize";
import s from './TextArea.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(s)

export default function TextArea({ formik, id, name, label, required, placeholder, minRows = 3, maxRows = 5, withAttach = false, attachId,readonly=false, height=70,maxLength=100 }) {
    function handleRemove(idx){
        formik.setFieldValue(attachId,formik.values[attachId].filter((el,index)=>index!==idx))
    }
    const [focused,setFocused]=React.useState(false)
    const error = formik.touched[id]&&formik.errors[id]
    const valid = formik.touched[id]&&!formik.errors[id]
    function handleBlur(e){
        setFocused(false)
        !isNil(formik)&&formik.handleBlur(e)
    }
    function handleFocus(){
        setFocused(true)
    }
    return (
        <div className={s["textarea__container"]}>
            {label && <label className={s["textarea__label"]}>{label} {required && '*'}
            </label>}
            <div className={cx({["textarea__wrapper"]:true, focused, error, valid})}>
                <TextAreaAutosize
                    defaultHeight={height}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={s['textarea__input']}
                    id={id}
                    name={name}
                    value={formik.values[id]}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    formik={formik}
                    readOnly={readonly}
                />
                {!isEmpty(formik?.values[attachId]) && <div className={s["textarea__files-preview__container"]}>
                    <hr />
                    <div className={s["textarea__files-preview__wrapper"]}>
                        {formik?.values[attachId].map((file, index) => <div key={index} className={s["textarea__files-preview__elem"]}>
                            <i className={s["textarea__files-preview__elem__icon"]}/>
                            <XIcon width={20} className={s["textarea__files-preview__elem__x-icon"]} onClick={()=>handleRemove(index)}/>
                            {file[0].name}
                        </div>
                        )}</div>
                </div>}
                {!readonly&&<span className={s["textarea__length"]}>{formik?.values[id].length}/{maxLength}</span>}
                {withAttach && !readonly&&<label className={s["textarea__attach-file"]}>
                    <PaperClipIcon width={20} className={s["textarea__attach-file__icon"]} />
                    <input type='file' style={{ width: 0, height: 0 }} onChange={(e) => formik.setFieldValue(attachId, [...formik.values[attachId], e.target.files])} />
                </label>}
            </div>


            {!isNil(formik.errors[name]) && <p className={s["textarea__error"]}>{formik.submitCount > 0 && formik.errors[name] && formik.errors[name]}</p>}

        </div>
    )
}