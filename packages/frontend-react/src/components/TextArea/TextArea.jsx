import React from "react";

export default React.memo(function TextArea({formik,id,name,label,isRequired,rows,placeholder}){
    const onBlur = (e) => {
        if (e.target.value.length == 0)
            document.getElementById(id+"-label").className = `${formik.submiCount>0 && formik.errors[name] ? 'text-red-700' :'text-gray-700'}  absolute text-sm duration-300 transform -translate-y-6  top-3 -z-10 origin-[0] left-0  translate-y-0 scale-15 -translate-y-6`;
    }
    const onFocus = (e) => {
        if(document.getElementById(id+"-label"))
            document.getElementById(id+"-label" ).className = `absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-100 top-3 -z-10 origin-[0]   ${formik.submiCount>0 && formik.errors[name] ? 'text-red-700' : 'text-[#6495ed]'}`;

    }

    return (
        <div className="relative z-0 mb-6 w-full group">
                <label id={id+"-label"} className={`${formik.submiCount > 0 && formik.errors[name] ? 'text-red-700' :'text-gray-700'}  absolute text-sm duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] left-0  translate-y-0 scale-100 -translate-y-6`}>
                    {label} {isRequired && '*'}
                </label>
                <textarea
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => onBlur(e)}
                    onInput={(e) => onFocus(e)}
                    rows={rows || 3}
                    className={`${formik.submitCount>0 && formik.errors[name] ? 'border-red-900' :''} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#6495ed]`}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange} />
                <p className="h-4 text-red-500 text-xs italic mt-4 mt-4">{formik.submiCount > 0 && formik.errors[name] && formik.errors[name]}</p>
            
        </div>
    )
})