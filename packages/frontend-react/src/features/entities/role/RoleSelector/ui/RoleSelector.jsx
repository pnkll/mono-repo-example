//import s from './RoleSelector.module.scss'

import { rolesApi } from "@services/RolesService";
import Select from "@src/shared/UiKit/Select/ui/primary/Select";

export default function RoleSelector(props) {
    const { data: roleList } = rolesApi.useGetRolesQuery({})
    const options = roleList && roleList.docs.map(role => ({ value: role._id, label: role.title }))
    return (
        <>
            <Select {...props}
                options={options}
            />
        </>
    )
}