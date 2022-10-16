import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { tableApi } from '../../../services/TableService';

export default function EditRow({ headerGroups, classNamePrefix, columns, setEditMode }) {
    const [postData, {isSuccess}]=tableApi.useAddContentMutation()
    const params = useParams()
    const [rows, setRows] = React.useState([
        {
            id: v4(),
            data: headerGroups[0].headers.map(el => el && { id: el.id, value: '' })
        }
    ])
    function addRow() {
        setRows([...rows,
        {
            id: v4(),
            data: headerGroups[0].headers.map(el => el && { id: el.id, value: '' })
        }
        ])
    }
    function setValue(value,id,cellId){
        setRows(rows.map(el=>el.id===id?{...el, data: el.data.map(cell=>cell.id===cellId?{...cell, value: value}:cell)}:el))
    }
    function handleSubmit(){
        //const data = rows.map(row=>row.data.map(cell=>cell.value))
        rows.forEach(row=>postData({table_id:params.id,data:row.data.map(cell=>cell.value===''?'-':cell.value)}))
        
    }
    React.useEffect(()=>{
        isSuccess&&setEditMode(false)
    },[isSuccess])
    return (
        <>
            {rows.map(el => <tr key={el.id} className={`${classNamePrefix}__body__row`}>
                {el.data.map(cell => <td key={cell.id} className={`${classNamePrefix}__body__elem__wrapper`}>
                    <input className={`${classNamePrefix}__body__elem__input`} type={'text'} placeholder={cell.value} onChange={(e)=>setValue(e.target.value,el.id,cell.id)}/>
                </td>)}
            </tr>)}
            {/* <tr className={`${classNamePrefix}__body__row`}>
                {headerGroups[0]?.headers.map(el => <td key={el.id} className={`${classNamePrefix}__body__elem__wrapper`}>
                    <input className={`${classNamePrefix}__body__elem__input`} type={'text'} placeholder={el.Header} />
                </td>)}
            </tr> */}
            <tr className={`${classNamePrefix}__body__row`} onClick={addRow}>
                <td colSpan={columns.length} className={`${classNamePrefix}__body__elem__plus`}>
                    <PlusIcon width={40} color='green'/>
                </td>
            </tr>
            <tr style={{ height: '100%', background: 'white' }}>
                                        <td colSpan={columns.length} />
                                    </tr>     
            {/* <button onClick={handleSubmit}>Сохранить</button>
            <button onClick={()=>setEditMode(false)}>Сбросить</button> */}
        </>
    )
}