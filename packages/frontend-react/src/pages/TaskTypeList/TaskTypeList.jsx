import ConfirmPopup from '@components/Popup/ConfirmPopup/ConfirmPopup';
import { XIcon } from '@heroicons/react/outline';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import { isNil } from 'lodash';
import React, { useRef, useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import Table from '../../components/Table/Table.jsx';
import { taskTypeApi } from '../../services/TaskTypeService.js';

export default function TaskTypeList() {
    const { data: taskTypesList, error, isLoading: isLoadingGet, isFetching, } = taskTypeApi.useGetTaskTypesQuery()
    const [fetchRemoveTaskType, { isLoading: isLoadingRemove }] = taskTypeApi.useRemoveTaskTypeMutation()
    const onAccess = useRef()
    const [showModal, setShowModal] = useState(false)
    function handleClick(id) {
        onAccess.current = () => fetchRemoveTaskType(id)
        setShowModal(true)
    }
    function customTd(value) {
        return <div style={{ display: 'flex', gap: 10 }}>
            <i style={{ display: 'flex', alignItems: 'center' }}>
                <XIcon width={20} color='red' style={{ cursor: 'pointer' }} onClick={() => handleClick(value)} />
            </i>
            <Button color='green' text='Перейти' href={value} />

        </div>
    }
    const columns = [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => customTd(value) || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Исполнитель', accessor: 'executor' },
        { Header: 'Ответственный', accessor: 'controller' },
        { Header: 'Время на выполнение', accessor: 'requiredTime' },
        { Header: 'Прикрепить', accessor: 'linkedContent' },
        { Header: 'Dead Line', accessor: 'deadLineHours' },
        { Header: 'Степень важности', accessor: 'priority' },
    ]
    return (
        <>
            <TransitionOverlay from='bottom'>
                {!isLoadingGet &&
                    <Table
                        createHref={'new'}
                        customColumns={columns}
                        customData={!isNil(taskTypesList)
                            ? taskTypesList.message
                            : []}
                        emptyCell={error
                            ? 'Произошла ошибка при загрузке данных'
                            : 'Пока что нет ни одного шаблона'}
                        />}
            </TransitionOverlay>
            {showModal
                &&<ConfirmPopup isOpen={showModal} onAccess={onAccess} question='Вы действительно хотите удалить шаблон?' onRequestClose={()=>setShowModal(false)}/>}
        </>
    )
}