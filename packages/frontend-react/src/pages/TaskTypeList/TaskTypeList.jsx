import { XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React, { useRef, useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal.jsx';
import Table from '../../components/Table/Table.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { taskTypeApi } from '../../services/TaskTypeService.js';

export default function TaskTypeList() {
    const { data: taskTypesList, error, isLoading: isLoadingGet, isFetching, } = taskTypeApi.useGetTaskTypesQuery()
    const [fetchRemoveTaskType, { isLoading: isLoadingRemove }] = taskTypeApi.useRemoveTaskTypeMutation()
    async function removeTaskType(id) {
        await fetchRemoveTaskType(id)
    }
    const modalCallback = useRef()
    const [showModal, setShowModal] = useState(false)
    function handleClick(id) {
        modalCallback.current = () => removeTaskType(id)
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
    const [fetchPostTaskType] = taskTypeApi.usePostTaskTypeMutation()
    const buttons = React.useMemo(() => [{ text: 'Создать', href: 'new', className: 'table__filters button' }], [])
    return (
        <>
            <TransitionLayout from='bottom'>
                {!isLoadingGet &&
                    <Table
                        columns={columns}
                        data={!isNil(taskTypesList)
                            ? taskTypesList.message
                            : []}
                        emptyCell={error
                            ? 'Произошла ошибка при загрузке данных'
                            : 'Пока что нет ни одного шаблона'}
                        buttons={buttons} />}
            </TransitionLayout>
            <ConfirmModal callback={modalCallback} isOpen={showModal} setIsOpen={setShowModal} label={'Вы действительно хотите удалить шаблон?'}/>
        </>
    )
}