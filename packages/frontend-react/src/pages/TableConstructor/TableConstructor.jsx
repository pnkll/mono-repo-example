import React, { useState } from "react";
import HeaderLayout from '../../page_layouts/HeaderLayout/HeaderLayout.jsx'
import './TableConstructor.scss'
import ReactSelect from "react-select";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { isNil } from "lodash";
import useDrag from "../../hooks/useDrag.js";
import Button from "../../components/Button/Button.jsx";
import TableConstructorForm from "../../components/TableConstructorForm/TableConstructorForm.jsx";

export default React.memo(function TableConstructor() {
    // const [headers, setHeaders] = useState([
    //     { order: 1, title: '', code: '', type: 'string', required: false, unique: false, toIndex: false, visible: false, focused: true },
    // ])
    // const handleAppend = () => {
    //     setHeaders([...headers, { order: headers[headers.length - 1].order + 1, title: '', code: '', type: 'string', required: false, unique: false, toIndex: false, visible: false, focused: true }])
    // }
    // const handleRemove = (idx) => {
    //     setHeaders(headers.filter((el, index) => index !== idx))
    // }
    // const handleChange = (index, field, value) => {
    //     setHeaders(headers.map((el, idx) => idx === index ? { ...el, [field]: value } : el))
    // }
    // const options = [
    //     { label: 'string', value: 'string' },
    //     { label: 'number', value: 'number' },
    //     { label: 'date', value: 'date' },
    // ]
    // const {sortItems,dragStartHandler,dragEndHandler,dragOverHandler,dropHandler}=useDrag(setHeaders,headers)
    const [data, setData] = useState([])
    const [forms, setForms] = useState([
        { order: 1 }
    ])
    const appendHandler = () => {
        setForms([...forms, { order: forms[forms.length - 1].order + 1 }])
    }
    const removeHandler = (idx) => {
        setForms(forms.filter((form, index) => form.order !== idx))
        setData(data.filter((data, index) => data.id !== idx))
    }
    const { sortItems, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler } = useDrag(setForms, forms)
    const submitHandler = () => {
        setData(data.map(el => el && { ...el, isSubmit: true }))
    }
    return (
        <>
            <HeaderLayout>
                <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                    <div className="" style={{ display: 'flex', gap: '10px' }}>
                        <Button text='Добавить поле' color='green' handleClick={appendHandler} />
                        <Button text='Создать таблицу' handleClick={submitHandler} />
                    </div>
                    <div style={{ display: 'flex', overflowX: 'scroll', overflowY: 'visible', }} className={'table-constructor__wrapper'}>
                        {/* {headers && headers.sort(sortItems).map((header, index) =>
                            <ul
                                draggable={true}
                                onDragStart={(e) => dragStartHandler(e,header)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragLeave={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e,header)}
                                className={`table-constructor__elem ${headers.length<2?'single':''}`}
                                key={index} style={{ listStyle: 'none', padding: 10, margin: 0 }}>
                                <li style={{ display: 'flex', gap: 10 }}><label>Title:</label><input type='text' value={header.title} onChange={(e) => handleChange(index, 'title', e.target.value)} /></li>
                                <li >
                                    <p onClick={() => setHeaders(headers.map((el, idx) => idx === index ? { ...el, visible: !el.visible } : el))} style={{ display: 'flex', gap: 10 }}>{header.visible ? <><ArrowUpIcon width={10} />Скрыть</> : <><ArrowDownIcon width={10} />Показать</>}&nbsp;свойства</p>
                                    <ul className={`props ${header.visible ? '' : 'closed'}`} style={{ listStyle: 'none', padding: 0, margin: 0, }}>
                                        <li style={{ display: 'flex', gap: 10 }}><label>Code:</label><input type='text' value={header.code} onChange={(e) => handleChange(index, 'code', e.target.value)} /></li>
                                        <li><ReactSelect options={options} value={{ label: header.type, value: header.type }} onChange={(e) => handleChange(index, 'type', e.value)}></ReactSelect></li>
                                        <li>req:<input type='checkbox' checked={header.required} onChange={(e) => handleChange(index, 'required', e.target.checked)} /></li>
                                        <li>unique:<input type='checkbox' checked={header.unique} onChange={(e) => handleChange(index, 'unique', e.target.checked)} /></li>
                                        <li>toIndex:<input type='checkbox' checked={header.toIndex} onChange={(e) => handleChange(index, 'toIndex', e.target.checked)} /></li>
                                    </ul>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button color='red' handleClick={()=>handleRemove(index)} text='Удалить поле'/>
                                </li>
                            </ul>
                        )} */}
                        {forms.sort(sortItems).map((form, index) => <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="drag__elem"
                                draggable={true}
                                onDragStart={(e) => dragStartHandler(e, form)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragLeave={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, form)}>
                                <TableConstructorForm
                                    removeHandler={removeHandler}
                                    index={index}
                                    order={form.order}
                                    key={index}
                                    setData={setData}
                                    data={data} />
                                <Button text='delete' handleClick={() => removeHandler(index)} />
                            </div>
                        </div>)}
                    </div>
                </div>
            </HeaderLayout>
        </>
    )
})