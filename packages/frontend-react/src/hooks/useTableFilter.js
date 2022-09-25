import { setFluidGetter } from '@react-spring/shared'
import { useState, useEffect, useMemo } from 'react'

export default function useTableFilter({ columns }) {
    const initValues = useMemo(() => columns.map(el => el ? { title: el.Header, id: el.accessor, value: '' } : el))
    const [values, setValues] = useState(initValues)
    const [data, setData] = useState({})
    function handleClear() {
        setValues(values.map(el => el ? { ...el, value: '' } : el))
        setData({})
    }
    function handleAccess() {
        setData(values
            .filter(el=>el.value!=='')
            .reduce((prev,item)=>
                {return {...prev, [item.id]:item.value}},{}))
    }
    function handleChange(e,val) {
        setValues(values.map(el => el.id === val.id ? { ...el, value: e.target.value } : el))
    }
    return { data, values, handleClear, handleAccess, handleChange }
}