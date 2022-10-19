import React from 'react';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import Table from '../../components/Table/Table.jsx';
import TransitionLayout from '../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import moment from 'moment';
import Button from '../../components/Button/Button.jsx';
import { useSelector } from 'react-redux';
import { selectRoleList } from '../../store/slices/rolesSlice.js';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { rolesApi } from '../../services/RolesService.js';

export default function Roles() {
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
    //const buttons = React.useMemo(()=>[{text: 'Создать', href:'new', className:'table__filters button'}],[])

    return (
        <>{!isNil(roleList) &&
            <TransitionLayout from='bottom'>
                <Table
                    customColumns={columns}
                    customData={roleList}
                //buttons={buttons}
                />
            </TransitionLayout>}
        </>
    )
}