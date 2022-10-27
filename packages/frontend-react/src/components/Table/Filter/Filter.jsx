import _ from 'lodash';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useTableFilter from '../../../hooks/useTableFilter.js';
import { tableApi } from '../../../services/TableService.js';
import Button from '../../Button/Button.jsx';
import Input from '../../Input/Input.jsx';
import s from './Filter.module.scss';
import Select from '../../Select/Select.jsx'
import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames/bind.js';

const cx =classNames.bind(s)

export default function Filter({ columns,
  setFilterData, 
  table_id,
  //id, height, 
  setFetching 
}) {
  const { data, values, setValues, handleClear, handleAccess, handleChange } = useTableFilter({ columns })
  const [filterTable, { data: message, isFetching }] = tableApi.useLazyGetContentByDataQuery()
  const [focus, setFocus] = useState(null)
  const [options, setOptions] = useState(values.map(el => el ? { value: el.id, label: el.id } : el))
  const [keyOfSelect, setKeyOfSelect] = useState(0)
  function handleRemove(id) {
    setValues(values.map(el => el.id === id ? { ...el, visible: false, value: '' } : el))
    const tmp = values.find(el => el.id === id)
    setOptions([...options, { value: tmp.id, label: tmp.id }])
  }
  function handleSelect(value) {
    setValues(values.map(el => el.id === value ? { ...el, visible: true } : el))
    setKeyOfSelect(keyOfSelect + 1)
    setOptions(options.filter(option => option.value !== value))
  }
  useEffect(() => {
    !_.isEmpty(data) ? filterTable({ data, table_id: table_id }) : setFilterData(null)
  }, [data])
  useEffect(() => {
    message && setFilterData(message.map(el => el ? el.data : el))
  }, [message])
  useEffect(() => {
    setFetching(isFetching)
  }, [isFetching])
  return (
    <>
      <div className={s['table-filter__elems']}>
        {values.map((val, index) => val.visible &&
          <div className={s['table-filter__elem']} key={val.id}>
            <label
              className={cx({[`table-filter__label`]:true, 'focused': (focus===val.id || val.value!=='')})}>
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
            <XIcon width={10} color='red' className={s['table-filter__elem__x-icon']} onClick={() => handleRemove(val.id)} />
          </div>)}
        {!_.isEmpty(options) && <div className={s['table-filter__elem']}>
          <Select key={keyOfSelect} options={options} handleChange={handleSelect} />
        </div>}
        <div className={s["table-filter__buttons"]}>
          <Button handleClick={handleAccess} color='green' text='Применить' disabled={_.isEmpty(values.filter(el=>el.value!==''))}/>
          <Button handleClick={handleClear} color='white' text='Сбросить' disabled={_.isEmpty(data)}/>
        </div>
      </div>
    </>
  )
}