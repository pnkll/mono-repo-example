import { PlusIcon, XIcon } from '@heroicons/react/solid';
import { isNil } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { TableContext } from '../../../Providers/Table/TableContext';
import { setEditMode, setTempData } from '../../../Providers/Table/TableReducer';
import { tableApi } from '../../../services/TableService';

export default function EditRow({ headerGroups, classNamePrefix }) {
    const [state, dispatch] = useContext(TableContext)
    function addRow() {
        dispatch(setTempData([...state.addContent.tempData, {
            id: v4(),
            data: headerGroups[0].headers.map(el => el && { id: el.id, value: '' })
        }]))
    }
    function setValue(value, id, cellId) {
        dispatch(setTempData(state.addContent.tempData.map(el => el.id === id ? { ...el, data: el.data.map(cell => cell.id === cellId ? { ...cell, value: value } : cell) } : el)))
        //setRows(rows.map(el => el.id === id ? { ...el, data: el.data.map(cell => cell.id === cellId ? { ...cell, value: value } : cell) } : el))
    }
    React.useEffect(() => {
        dispatch(setTempData([
            {
                id: v4(),
                data: headerGroups[headerGroups.length-1].headers.map(el => el && { id: el.id, value: '' })
            }
        ]))
    }, [])
    function handleRemove(id){
        state.addContent.tempData.length===1&&dispatch(setEditMode())
        dispatch(setTempData(state.addContent.tempData.filter(el=>el.id!==id)))
    }
    console.log(state.addContent.tempData)
    return (
        <>
            {state.addContent.tempData.map(el => <tr key={el.id} className={`${classNamePrefix}__body__row`}>
                {el.data.map((cell,index) => <td key={cell.id} className={`${classNamePrefix}__body__elem__wrapper`}>
                    <input className={`${classNamePrefix}__body__elem__input`} type={'text'} placeholder={cell.value} onChange={(e) => setValue(e.target.value, el.id, cell.id)} />
                    {el.data.length-1===index&&<i className={`${classNamePrefix}__body__elem__x-icon`}><XIcon color='red' width={20} onClick={()=>handleRemove(el.id)}/></i>}
                </td>)}
            </tr>)}
            <tr className={`${classNamePrefix}__body__row`} onClick={addRow}>
                <td colSpan={headerGroups[headerGroups.length-1].headers.length} className={`${classNamePrefix}__body__elem__plus`}>
                    <PlusIcon width={40} color='green' />
                </td>
            </tr>
            <tr style={{ height: '100%', background: 'white' }}>
                <td colSpan={headerGroups[headerGroups.length-1].headers.length} />
            </tr>
        </>
    )
}