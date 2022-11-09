//import s from './PrioritySelector.module.scss'

import { Select } from "@src/shared/UiKit/Select/index";

export default function PrioritySelector({value,...other}){
    const options = [
        { label: 'Очень срочно', value: 4 },
        { label: 'Срочно', value: 3 },
        { label: 'Высокий', value: 2 },
        { label: 'Средний', value: 1 },
        { label: 'Низкий', value: 0 }
    ]
   return(
       <>
          <Select value={value} options={options} {...other}/>
       </>
   )
}