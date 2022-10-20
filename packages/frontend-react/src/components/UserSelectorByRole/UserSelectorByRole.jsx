import _, { isNil } from 'lodash';
import React from 'react';
import { rolesApi } from '../../services/RolesService';
import { usersApi } from '../../services/UsersService';
import Select from '../Select/Select';

export default function UserSelectorbyRole({ formik, roleId, selectedId, defaultValue, handleChange, id, name, label }) {
    const { data: userIds } = rolesApi.useGetUsersByRoleIdQuery(roleId)
    const [getUsers, { data: users }] = usersApi.useLazyGetUsersByIdQuery()
    React.useEffect(() => {
        !isNil(userIds) && getUsers(userIds)
    }, [userIds])
    const options = React.useMemo(() => users
        ? users.map(user => ({ label: `${user.firstname} ${user.lastname}`, value: user._id }))
        : [], [users])
    return (
        <>
            {!_.isEmpty(options)
                && <Select
                    formik={formik}
                    id={id}
                    name={name}
                    options={options}
                    defaultValue={defaultValue}
                    selectedValue={selectedId} 
                    handleChange={handleChange}
                    label={label}/>}
        </>
    )
}