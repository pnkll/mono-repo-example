import { PlusIcon } from '@heroicons/react/solid';
import { isNil } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { TableContext } from '../../../Providers/Table/TableContext';
import { setTempData } from '../../../Providers/Table/TableReducer';
import { tableApi } from '../../../services/TableService';

export default function EditRow({ headerGroups, classNamePrefix, columns, setEditMode }) {
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
                data: headerGroups[0].headers.map(el => el && { id: el.id, value: '' })
            }
        ]))
    }, [])
    console.log(state)
    return (
        <>
            {state.addContent.tempData.map(el => <tr key={el.id} className={`${classNamePrefix}__body__row`}>
                {el.data.map(cell => <td key={cell.id} className={`${classNamePrefix}__body__elem__wrapper`}>
                    <input className={`${classNamePrefix}__body__elem__input`} type={'text'} placeholder={cell.value} onChange={(e) => setValue(e.target.value, el.id, cell.id)} />
                </td>)}
            </tr>)}
            <tr className={`${classNamePrefix}__body__row`} onClick={addRow}>
                <td colSpan={columns.length} className={`${classNamePrefix}__body__elem__plus`}>
                    <PlusIcon width={40} color='green' />
                </td>
            </tr>
            <tr style={{ height: '100%', background: 'white' }}>
                <td colSpan={columns.length} />
            </tr>
        </>
    )
}