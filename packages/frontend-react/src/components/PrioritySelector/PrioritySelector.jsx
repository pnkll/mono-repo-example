// import s from './PrioritySelector.module.scss'

import Select from "@components/Select/Select";
import {priorityOptions} from '@src/helpers/forTask'

export default function PrioritySelector(props){

   return(
       <>
          <Select options={priorityOptions} {...props}/>
       </>
   )
}