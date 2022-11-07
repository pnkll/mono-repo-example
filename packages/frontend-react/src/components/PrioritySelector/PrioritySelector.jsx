// import s from './PrioritySelector.module.scss'

import Select from "@components/Select/Select";
import {priorityOptions} from '@src/helpers/forTask'
import React from 'react'

const PrioritySelector = React.forwardRef((props,ref)=>{

   return(
       <>
          <Select ref={ref} options={priorityOptions} {...props}/>
       </>
   )
})
export default PrioritySelector