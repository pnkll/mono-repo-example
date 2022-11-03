//import s from './RoleSelector.module.scss'

import Select from "@components/Select/Select";
import { selectRoleList } from "@store/slices/rolesSlice";
import { useSelector } from "react-redux";
import React from 'react'

export default function RoleSelector(props) {
    const roleList = useSelector(selectRoleList)
    const roleForOptions = React.useMemo(() => {
        return roleList.map(role => ({ value: role._id, label: role.title }))
    }, [roleList])
    return (
        <>
            <Select
                options={roleForOptions}
                {...props}
            />
        </>
    )
}