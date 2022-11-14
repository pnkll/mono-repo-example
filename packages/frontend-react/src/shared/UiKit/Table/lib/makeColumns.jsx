import { isNil } from 'lodash'
import React from 'react'

export function makeColumns(Component, displayName) {
    function Columns({ customColumns, columnsData, ...other }) {
        const columns = React.useMemo(()=>customColumns
            ? customColumns
            : Object.keys(columnsData?.headers).map((el, index) => (
                {
                    Header: Object.values(columnsData?.headers)[index],
                    accessor: el
                })
            ),[customColumns,columnsData])
        return (!isNil(columns)&&<Component columns={columns} {...other} />)
    }
    Columns.displayName = displayName + 'WithColumns'
    return Columns
}