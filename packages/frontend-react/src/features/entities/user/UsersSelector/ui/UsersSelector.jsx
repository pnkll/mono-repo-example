import { getUsers } from '@src/features/entities/user/UsersSelector/model/getUsers'
import { Select } from '@src/shared/UiKit/Select/index'
export default function UsersSelector({ roleId, ...other }) {
    const options = getUsers(roleId)
    return (
        <>
            <Select options={options} {...other} />
        </>
    )
}