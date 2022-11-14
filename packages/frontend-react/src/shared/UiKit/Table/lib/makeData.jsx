import { setLimit, setPage, setTotalDocs, setTotalPages, useTrackedTable } from "@src/shared/UiKit/Table/provider/index"
import { isNil } from "lodash"
import React from "react"
import { useParams } from "react-router-dom"

export function makeData(Component, displayName) {
    function Data({ customData, rtkHook, ...other }) {
        const { id } = useParams()
        const [getData, { data: tableData, isSuccess, isFetching, isError }] = rtkHook()
        const [state, dispatch] = useTrackedTable()
        const data = React.useMemo(() => !isNil(customData)
            ? customData
            : tableData?.docs.map(el => el.hasOwnProperty('data')
                ? el.data
                : el), [tableData, customData])
        React.useLayoutEffect(() => {
            isNil(customData) && getData({ table_id: id })
        }, [customData])
        React.useEffect(() => {
            if (!isNil(tableData)) {
                dispatch(setLimit(tableData.limit))
                dispatch(setPage(tableData.page))
                dispatch(setTotalDocs(tableData.totalDocs))
                dispatch(setTotalPages(tableData.totalPages))
            }
        }, [tableData])
        return (!isNil(data) && <Component data={data} columnsData={tableData} {...other} />)
    }
    Data.displayName = displayName + 'WithData'
    return Data
}