import React, { useState } from "react";
import HeaderLayout from '../../page_layouts/HeaderLayout/HeaderLayout.jsx'
import './TableConstructor.scss'
import { isEmpty, isNil } from "lodash";
import useDrag from "../../hooks/useDrag.js";
import Button from "../../components/Button/Button.jsx";
import Table from "../../components/Table/Table.jsx"
import * as Yup from 'yup'
import TableConstrustorField from "../../components/TableConstructor/TableConstructorField/TableConstrustorField.jsx";
import { PlusIcon } from "@heroicons/react/outline";
import InfoPopUp from "../../components/InfoPopUp/InfoPopUp.jsx";

export default React.memo(function TableConstructor() {
    const [headers, setHeaders] = useState([
        { order: 1, title: '', code: '', type: 'string', required: false, unique: false, toIndex: false, visible: false, focused: true },
    ])
    const handleAppend = () => {
        setHeaders([...headers, { order: headers[headers.length - 1].order + 1, title: '', code: '', type: 'string', required: false, unique: false, toIndex: false, visible: false, focused: true }])
    }
    const schema = Yup.object().shape({
        title: Yup.string().required('Обязательное поле'),
        code: Yup.string().matches(/^[a-zA-Z]+$/, 'Только английские буквы без пробелов'),
    });
    const [errors, setErrors] = useState([])
    const [columns, setColumns] = useState([])
    const [infoVisible, setInfoVisible] = useState(true)
    const { sortItems, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler } = useDrag(setHeaders, headers)
    const submitHandler = async () => {
        setErrors([])
        let fakeColumns = []
        let fakeErrors = []
        headers.map(header => schema.validate(header, { abortEarly: false })
            .then(() => {
                fakeColumns = [...fakeColumns, { Header: header.title, accessor: header.code }]
                setColumns(fakeColumns)
            })
            .catch((err) => {
                const errorsObj = err.inner.reduce((acc, error) => {
                    return {
                        ...acc,
                        [error.path]: { type: error.type, errors: error.errors },
                    }
                }, {})
                fakeErrors = [...fakeErrors, { order: header.order, errors: errorsObj }]
                setErrors(fakeErrors)
            }))
    }
    return (
        <>
            <HeaderLayout>
                <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                    <div className="" style={{ display: 'flex', gap: '10px' }}>
                        <Button text='Добавить поле' color='green' handleClick={handleAppend} />
                        <Button text={`${!isEmpty(columns) ? 'Обновить' : 'Создать'} таблицу`} handleClick={submitHandler} />
                        <InfoPopUp><p>Title: обязательное поле</p>
                            <p>Сode: должен содержать только английские буквы без пробелов</p>
                            <p>Type: тип данных которые будет содержать поле</p></InfoPopUp>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <div style={{ display: 'flex', }} className={'table-constructor__wrapper'}>
                            {!isNil(headers) && headers.sort(sortItems).map((header, index) =>
                                <div key={index} className={`table-constructor__drag__elem ${headers.length < 2 ? 'single' : ''}`}
                                    draggable={true}
                                    onDragStart={(e) => dragStartHandler(e, header)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragLeave={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, header)}>
                                    <TableConstrustorField field={header} errors={!isEmpty(errors) && errors.find(error => error.order === header.order)?.errors} fields={headers} setFields={setHeaders} index={index} />
                                </div>
                            )}
                        </div>
                        <PlusIcon width={20} color='green' style={{ marginBottom: 'auto', cursor: "pointer" }} onClick={handleAppend} />
                    </div>
                    {!isEmpty(columns) && <><Table columns={columns} data={[]} />
                        <Button text={'Импортировать данные'} color={'green'} /></>}
                </div>
            </HeaderLayout>
        </>
    )
})