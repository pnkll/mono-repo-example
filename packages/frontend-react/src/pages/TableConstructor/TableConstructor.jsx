import React, { useEffect, useState } from "react";
import HeaderLayout from '../../page_layouts/HeaderLayout/HeaderLayout.jsx'
import './TableConstructor.scss'
import ReactSelect from "react-select";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";

export default React.memo(function TableConstructor() {
    const [headers, setHeaders] = useState([
        { title: '', code: '', type: 'string', required: false, unique: false, toIndex: false, visible: false, focused: true },
    ])
    const [visible,setVisible]=useState([])
    const handleAppend =()=>{
        setHeaders([...headers,{ title: '', code: '', type: 'string', required: false, unique: false, toIndex: false, visible: false, focused: true }])
    }
    const handleRemove =(idx)=>{
        console.log(visible)
        setHeaders(headers.filter((el,index)=>index!==idx))
    }
    const handleChange = (index,field,value)=>{
        setHeaders(headers.map((el,idx)=>idx===index?{...el,[field]: value}:el))
    }
    const options = [
        {label: 'string', value: 'string'},
        {label: 'number', value: 'number'},
        {label: 'date', value: 'date'},
    ]
    return (
        <>
            <HeaderLayout>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '10px', overflowX:'scroll',overflowY:'visible' }}>
                        {headers && headers.map((header, index) =>
                            <ul key={index} style={{listStyle: 'none', padding: 10, margin: 0}}>
                                <li style={{display: 'flex', gap: 10}}><label>Title:</label><input type='text' value={header.title} onChange={(e)=>handleChange(index,'title',e.target.value)}/></li>
                                <li >
                                <p onClick={()=>setHeaders(headers.map((el,idx)=>idx===index?{...el,visible: !el.visible}:el))} style={{display:'flex',gap:10}}>{header.visible?<><ArrowUpIcon width={10}/>Скрыть</>:<><ArrowDownIcon width={10}/>Показать</>}&nbsp;свойства</p>
                                    <ul className={`props ${header.visible?'':'closed'}`} style={{listStyle: 'none', padding: 0, margin: 0,}}>
                                        <li style={{display: 'flex', gap: 10}}><label>Code:</label><input type='text' value={header.code} onChange={(e)=>handleChange(index,'code',e.target.value)}/></li>
                                        <li><ReactSelect options={options} value={{label: header.type, value: header.type}} onChange={(e)=>handleChange(index,'type',e.value)}></ReactSelect></li>
                                        <li>req:<input type='checkbox' checked={header.required} onChange={(e)=>handleChange(index,'required',e.target.checked)}/></li>
                                        <li>unique:<input type='checkbox' checked={header.unique} onChange={(e)=>handleChange(index,'unique',e.target.checked)}/></li>
                                        <li>toIndex:<input type='checkbox' checked={header.toIndex} onChange={(e)=>handleChange(index,'toIndex',e.target.checked)} /></li>
                                    </ul>
                                </li>
                                <li style={{display:'flex',justifyContent:'center'}}>
                                    <button onClick={()=>handleRemove(index)} >Удалить поле</button>
                                </li>
                            </ul>
                        )}
                    </div>
                    <button style={{ height: '30px' }} onClick={handleAppend}>Добавить поле</button>
                </div>
            </HeaderLayout>
        </>
    )
})