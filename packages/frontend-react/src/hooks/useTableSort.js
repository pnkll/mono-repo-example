import React from "react";

export default function useTableSort({columns}){
    
    const [stateColumns,setStateColumns]=React.useState(columns)
    const [sort,setSort]=React.useState()

    function sortDataCallback(key){
        setStateColumns(stateColumns.map(el=>el.type==='sort'&&key===el.accessor?{...el, sort: el.sort<=0?1:-1}:el.type==='sort'?{...el, sort: 0}:el))
    }

    React.useEffect(()=>{
       setSort(stateColumns.filter(el => el.type === 'sort' && el.sort !== 0).reduce((prev, item) => {
            return { ...prev, [item.accessor]: item.sort }
        }, {}))
    },[stateColumns])
    
    return{sort,stateColumns,sortDataCallback}
}