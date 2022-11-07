//import s from './RoleSelector.module.scss'

import Select from "@components/Select/Select";
import { selectRoleList } from "@store/slices/rolesSlice";
import { useSelector } from "react-redux";
import React from 'react'
import { rolesApi } from "@services/RolesService";

const RoleSelector = React.forwardRef((props,ref)=> {
    // const roleList = useSelector(selectRoleList)
    // const roleForOptions = React.useMemo(() => {
    //     return roleList.map(role => ({ value: role._id, label: role.title }))
    // }, [roleList])
    const {data}=rolesApi.useGetRolesQuery({})
    const options=data?.docs?.map(role=>({value: role._id, label: role.title}))
    return (
        <>
            <Select
                // options={roleForOptions}
                options={options}
                ref={ref}
                {...props}
            />
        </>
    )
})

export default RoleSelector