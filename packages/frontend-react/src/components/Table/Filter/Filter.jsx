import _ from 'lodash';
import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useTableFilter from '../../../hooks/useTableFilter.js';
import { tableApi } from '../../../services/TableService.js';
import Button from '../../Button/Button.jsx';
import Input from '../../Input/Input.jsx';
import './Filter.scss';
import Select from '../../Select/Select.jsx'

export default function Filter({ columns, setFilterData, id,height }) {
  const { data, values, handleClear, handleAccess, handleChange } = useTableFilter({ columns })
  const [filterTable, { data: message }] = tableApi.useLazyGetContentByDataQuery()
  useEffect(() => {
    !_.isEmpty(data) ? filterTable({ data, table_id: id }) : setFilterData(null)
  }, [data])
  useEffect(() => {
    message && setFilterData(message.map(el => el ? el.data : el))
  }, [message])
  const [focus, setFocus] = useState(null)
  const options = useMemo(()=>values.map(el=>el?{value: el.id,label:el.id}:el))
  return (
    <>
      <div className='table-filter__elems'>
        {/* {values.map((val, index) =>
          <div className='table-filter__elem' key={index}>
            <label
              className={`table-filter__label${focus === val.id || val.value !== '' ? ' focused' : ''}`}>
              {val.title}
            </label>
            <Input
              key={index}
              name={val.id}
              id={val.id}
              value={values.find(el => el.id === val.id).value}
              handleChange={(e) => handleChange(e, val)}
              setFocus={setFocus}
            />
          </div>)} */}
          <Select options={options} handleChange={(e)=>console.log(e)}/>
        <div className="table-filter__buttons">
          <Button handleClick={handleAccess} color='green' text='Применить' />
          <Button handleClick={handleClear} color='white' text='Сбросить' />
        </div>
      </div>
    </>
  )
}