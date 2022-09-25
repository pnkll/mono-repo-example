import _ from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import useTableFilter from '../../../hooks/useTableFilter.js';
import { tableApi } from '../../../services/TableService.js';
import Input from '../../Input/Input.jsx';

export default function Filter({columns,setFilterData,id}){
  const {data,values,handleClear,handleAccess,handleChange}=useTableFilter({columns})
  const [filterTable, {data: message}]=tableApi.useLazyGetContentByDataQuery()
  useEffect(()=>{
    _.isEmpty(data)?filterTable({data,table_id:id}):setFilterData(null)
  },[data])
  useEffect(()=>{
    message&&setFilterData(message)
  },[message])
   return(
       <>
        <div style={{ background: 'wheat' }}>
          {values.map((val,index)=><div key={index}>
            <label>{val.title}</label>
            <Input key={index} name={val.id} id={val.id} value={values.find(el=>el.id===val.id).value} handleChange={
            (e)=>handleChange(e,val)
          }/>
          </div>)}
          <button onClick={handleClear}>Сбросить</button>
          <button onClick={handleAccess}>Применить</button>
        </div>
       </>
   )
}