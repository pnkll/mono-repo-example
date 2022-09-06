import React, { useEffect, useState } from "react";
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx'
import './TableConstructor.scss'
import _, { isEmpty, isNil } from "lodash";
import useDrag from "../../hooks/useDrag.js";
import Button from "../../components/Button/Button.jsx";
import Table from "../../components/Table/Table.jsx"
import * as Yup from 'yup'
import TableConstrustorField from "../../components/TableConstructor/TableConstructorField/TableConstrustorField.jsx";
import { PlusIcon } from "@heroicons/react/outline";
import InfoPopUp from "../../components/InfoPopUp/InfoPopUp.jsx";
import DragNDropCell from "../../components/DragNDropCell/DragNDropCell.jsx";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import Input from "../../components/Input/Input.jsx";
import { tableApi } from "../../services/TableService.js";

export default React.memo(function TableConstructor() {
    const [title, setTitle] = useState('')
    const [headers, setHeaders] = useState([{ order: 1, title: '', code: '', type: 'String', required: false, unique: false, index: false, visible: false, focused: true }])
    const { sortItems, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler } = useDrag(setHeaders, headers)
    const [table, setTable] = useState({})
    const [errors, setErrors] = useState([])
    function handleAppend() {
        setHeaders([...headers, { order: headers[headers.length - 1].order + 1, title: '', code: '', type: 'String', required: false, unique: false, index: false, visible: false, focused: true }])
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Обязательное поле'),
        code: Yup.string().matches(/^[a-zA-Z]+$/, 'Только английские буквы без пробелов'),
    });
    const [postTable, { isLoading, isFetching }] = tableApi.useCreateTableMutation()
    async function fetchData(data) {
        const response = await postTable(data)
        response.data?.status === 200 && setTable({...table, title: response?.data?.message?.title, columns: response?.data?.message?.headers.map((el, index) => el && { Header: el, accessor: Object.keys(response?.data?.message?.schema)[index] })})
    }
    async function submitHandler() {
        setErrors([])
        let fakeErrors = []
        headers.map(header => validationSchema.validate(header, { abortEarly: false })
            .then(() => {
                const data = {
                    org_id: '6315fbd3d50683eb579a29bc',
                    title: title,
                    headers: headers.map(el => el.title),
                    schema: headers.reduce((result, item) => ({
                        ...result,
                        [item.code]: { index: item.index, type: item.type }
                    }), {})
                }
                fetchData(data)
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
            <SidebarHeaderLayout>
                <TransitionLayout>
                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', height: '100%' }}>
                        <div className="" style={{ display: 'flex', gap: '10px' }}>
                            <Button text='Добавить поле' color='green' handleClick={handleAppend} />
                            <Button text={`${_.has(table,'columns') ? 'Обновить' : 'Создать'} таблицу`} handleClick={submitHandler} />
                            <InfoPopUp><p>Title: обязательное поле</p>
                                <p>Сode: должен содержать только английские буквы без пробелов</p>
                                <p>Type: тип данных которые будет содержать поле</p></InfoPopUp>
                        </div>
                        <div className="table-constructor__title-input">
                            <Input placeholder='Название таблицы' value={title} handleChange={(e) => setTitle(e.target.value)} />
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
                            <PlusIcon width={20} color='green' style={{ marginBottom: 'auto', marginTop: 5, cursor: "pointer" }} onClick={handleAppend} />
                        </div>
                        {_.has(table,'columns') && <Table label={table.title} columns={table.columns} data={[]} emptyCell={<DragNDropCell />} />}
                    </div>
                </TransitionLayout>
            </SidebarHeaderLayout>
        </>
    )
})