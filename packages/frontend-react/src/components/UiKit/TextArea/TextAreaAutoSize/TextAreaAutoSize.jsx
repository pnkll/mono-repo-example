import React from 'react';

export default function TextAreaAutosize({ formik, defaultHeight, ...other }) {
    function setTextAreaHeight(element) {
        const target = element.target ? element.target : element
        target.style.height = defaultHeight + 'px'
        target.style.height = target.scrollHeight + 'px'
    }
    function handleChange(e){
        formik.handleChange(e)
        setTextAreaHeight(e)
    }
    return (
        <>
            <textarea
                style={{height:defaultHeight}}
                onChange={handleChange}
                {...other}
            />

        </>
    )
}