import React from "react";
import './TextArea.scss'

export default React.memo(function TextArea({formik,id,name,label,required,rows,placeholder,}){
    const onBlur = (e) => {
        if (e.target.value.length == 0)
            document.getElementById(id+"-label").className = `${formik.submiCount>0 && formik.errors[name] ? 'text-red-700' :'text-gray-700'}  absolute text-sm duration-300 transform -translate-y-6  top-3 -z-10 origin-[0] left-0  translate-y-0 scale-15 -translate-y-6`;
    }
    const onFocus = (e) => {
        if(document.getElementById(id+"-label"))
            document.getElementById(id+"-label" ).className = `absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-3 -z-10 origin-[0]   ${formik.submiCount>0 && formik.errors[name] ? 'text-red-700' : 'text-[#6495ed]'}`;

    }

    return (
        <div className="textarea__container" 
        //className="relative z-0 mb-6 w-full group"
        >
                {label&&<label className="textarea__label">{label} {required && '*'}
                </label>}
                <textarea
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => onBlur(e)}
                    onInput={(e) => onFocus(e)}
                    rows={rows || 3}
                    className='textarea__input'
                    //{`${formik.submitCount>0 && formik.errors[name] ? 'border-red-900' :''} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#6495ed]`}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange} />
                <p className="textarea__error">{formik.submitCount > 0 && formik.errors[name] && formik.errors[name]}</p>
            
        </div>
    )
})