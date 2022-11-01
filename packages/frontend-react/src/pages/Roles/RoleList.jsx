import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import Table from '@components/Table/Table';
import { selectRoleList } from '@store/slices/rolesSlice';

export default function RoleList() {
    const roleList = useSelector(selectRoleList)
    function formatDate(date) {
        return moment(date).locale('ru').format("Do MMMM YYYY")
    }
    const columns = [
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt', Cell: ({ value }) => formatDate(value) },
        { Header: 'Последнее обновление', accessor: 'updatedAt', Cell: ({ value }) => formatDate(value) }
    ]

    return (
        <>{!isNil(roleList) &&
            <TransitionOverlay from='bottom'>
                <Table
                    createHref='new'
                    customColumns={columns}
                    customData={roleList}
                />
            </TransitionOverlay>}
        </>
    )
}