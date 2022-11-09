import { rolesApi } from '@services/RolesService'
import { usersApi } from '@services/UsersService'
import { Select } from '@src/shared/UiKit/Select/index'
import { isNil } from 'lodash'
import { useEffect } from 'react'
import s from './UsersSelector.module.scss'

export default function UsersSelector({ roleId, ...other }) {
    const [getRoleById,{data:role,isSuccess: isSuccessRoleById}]=rolesApi.useLazyGetRoleByIdQuery()
    const [getUsersByRoleName, { data: usersByRoleName, isSuccess: isSuccessUsersByRoleName }] = rolesApi.useLazyGetUsersByRoleNameQuery()
    const [getUsers, { data: users, isSuccess: isSuccessGetUsers }] = usersApi.useLazyGetUsersQuery()
    function getOptions() {
        if (isSuccessGetUsers) {
            return users
        } else if (isSuccessUsersByRoleName) {
            return usersByRoleName
        }
        return []
    }
    const options = getOptions().map(el => ({ value: el._id, label: `${el.lastname} ${el.firstname}` }))
    useEffect(() => {
        roleId
            ? getRoleById(roleId)
            : getUsers()
    }, [])
    useEffect(()=>{
        isSuccessRoleById&&getUsersByRoleName(role.name)
    },[isSuccessRoleById])
    return (
        <>
            <Select options={options} {...other} />
        </>
    )
}