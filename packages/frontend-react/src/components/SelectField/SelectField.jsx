import { isNil } from 'lodash';
import React from 'react';
import ReactSelect from 'react-select'

export default React.memo(function SelectField({options,value,id,name,formik,label}){
   return(
       <>
        {!isNil(label)&&<label>{label}</label>}
        <ReactSelect onChange={(e)=>formik.setFieldValue(id,e)} onBlur={()=>formik.setFieldTouched(id,true)} id={id} options={options} value={formik.values[id]}/>
       </>
   )
})