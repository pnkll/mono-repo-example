import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import Table from '@components/Table/Table';
import { selectRoleList } from '@store/slices/rolesSlice';
import Button from '@components/Button/Button';
import { rolesApi } from '@services/RolesService';
import { withTransition } from '@src/hocs/withTransition/withTransition';

function RoleList() {
    // const roleList = useSelector(selectRoleList)
    const columns = React.useMemo(()=>[
        { Header: '', accessor: '_id', Cell: ({ cell: { value } }) => <Button color='green' text='Перейти' href={value} /> || '-' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Дата создания', accessor: 'createdAt', Cell: ({ value }) => value },
        { Header: 'Последнее обновление', accessor: 'updatedAt', Cell: ({ value }) => value }
    ],[])

    return (
        <>
            <Table
                sortable={['createdAt','updatedAt']}
                createHref='new'
                customColumns={columns}
                rtkHook={rolesApi.useLazyGetRolesQuery}
                filterable={false}
                editable={false}
            />
        </>
    )
}

export default RoleList = withTransition(RoleList,'RoleList','bottom')