import { isNil } from "lodash"
import React from "react"

export default function useQueryProps({itemsCount,currentPage,sort,rtkHook}){
    const [postData,{data,isFetching,isLoading,isError}]=rtkHook()
    const [page,setPage]=React.useState(currentPage)
    const [limit,setLimit]=React.useState(itemsCount)
    React.useEffect(()=>{
        !isNil(page&&limit&&!isNil(sort)?sort:true)&&postData({sort,limit,page})
    },[limit,page,sort])
    return [data,limit,setLimit,page,setPage,isFetching,isLoading,isError]
}