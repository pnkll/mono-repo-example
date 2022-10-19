import { AdjustmentsIcon, ChevronDownIcon, MinusIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TableContext } from '../../../Providers/Table/TableContext.js';
import { setDragDropMode, setEditMode, setFilterMode, setIsOpen, setPage, } from '../../../Providers/Table/TableReducer.js';
import { tableApi } from '../../../services/TableService.js';
import Button from '../../Button/Button.jsx';

export default React.memo(function TableHeader({ cls = 'table', filters, setFilters, editable = false, createHref, filterable }) {
    const [{ addContent, totalPages, dragDropMode, isOpen }, dispatch] = useContext(TableContext)
    const [postData] = tableApi.useAddContentMutation()
    const params = useParams()
    function handlePost() {
        dispatch(setEditMode())
        if (addContent.editMode) {
            addContent.tempData.forEach(row => postData({ table_id: params.id, data: row.data.map(cell => cell.value) }))
        } else{
            dispatch(setPage(totalPages))
        }
    }
    return (
        <>
            <div className={`${cls}__filters__container`}>
                <div className={`${cls}__filters__group`}>
                    {!isNil(filters) && filters.map((filter, index) => <button
                        key={index}
                        disabled={filter.status}
                        className={`${cls}__filters__group__elem ${filter.status ? 'active' : ''}`}
                        onClick={() => setFilters(filters.map((el) => el.title === filter.title
                            ? { ...el, status: true }
                            : { ...el, status: false }))}
                    >{filter.title}</button>)}
                </div>
                <div className={`${cls}__filters__control`}>
                    {/* {!isNil(buttons) && buttons.map((el, index) => <Button key={index} cls={el.className ? el.className : 'button'} text={el.text} handleClick={el.callback} color={el.color} href={el.href} />)} */}
                    {!isNil(createHref)&&<Button href={createHref} classNamePrefix={'table__filters button'} text='Создать'/>}
                    {editable && <>
                        <Button disabled={addContent.editMode} text={dragDropMode ? 'Показать таблицу' : 'Загрузить данные'} handleClick={() => dispatch(setDragDropMode())} classNamePrefix={'table__filters button'} />
                        <Button disabled={dragDropMode} text={addContent.editMode ? 'Сохранить' : 'Редактировать'} handleClick={handlePost} classNamePrefix={'table__filters button'} />
                    </>}
                    {isOpen
                        ? <MinusIcon width={20} style={{ marginTop: 'auto', cursor: 'pointer' }} onClick={() => dispatch(setIsOpen())} />
                        : <ChevronDownIcon width={20} style={{ marginTop: 'auto', cursor: 'pointer' }} onClick={() => dispatch(setIsOpen())} />}
                    {filterable &&
                        <div className="" onClick={() => dispatch(setFilterMode())} style={{ cursor: 'pointer' }}>
                            <AdjustmentsIcon width={20} style={{ rotate: '90deg', cursor: 'pointer' }} />
                        </div>}
                </div>
            </div>
        </>
    )
})