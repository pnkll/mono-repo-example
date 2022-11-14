import { rolesApi } from "@services/RolesService"
import { usersApi } from "@services/UsersService"
import { isNil } from "lodash"
import React from 'react'

export function getUsers(roleId){
    const {data:role}=rolesApi.useGetRoleByIdQuery(roleId)
    const [getUsersByRoleName,{data:users}]=rolesApi.useLazyGetUsersByRoleNameQuery()
    const [getAllUsers,{data:allUsers}]=usersApi.useLazyGetUsersQuery()
    React.useEffect(()=>{
        !isNil(role)&&getUsersByRoleName(role?.name)
    },[role])
    React.useEffect(()=>{
        isNil(roleId)&&getAllUsers()
    },[roleId])
    return (users||allUsers)?.map(user=>({label:`${user.lastname} ${user.firstname}`, value: user._id}))
}