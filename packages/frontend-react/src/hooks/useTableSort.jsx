import _, { isNil } from "lodash";
import React from "react";
import { useContext } from "react";
import { TableContext } from "../Providers/Table/TableContext";
import { setColumns, setSort } from "../Providers/Table/TableReducer";

export default function useTableSort({ columns:initialColumns, sortable }) {
    const [{columns,sort},dispatch]=useContext(TableContext)
    //const [stateColumns, setStateColumns] = React.useState()
    //const [sort, setSort] = React.useState({})
    console.log(sort)
    function sortDataCallback(key) {
        console.log(columns)
        //dispatch(setColumns.map(el => el.type === 'sort' && key === el.accessor ? { ...el, sort: el.sort <= 0 ? 1 : -1 } : el.type === 'sort' ? { ...el, sort: 0 } : el))
        
        //dispatch(setColumns(v=>v.map(el=>(el.accessor===key?{...el, sort: index}:{...el, sort: 0}))))
        //dispatch(setSort({[key]: index}))
    }

    // React.useEffect(()=>{
    //    setSort(stateColumns.filter(el => el.type === 'sort' && el.sort !== 0).reduce((prev, item) => {
    //         return { ...prev, [item.accessor]: item.sort }
    //     }, {}))
    // },[stateColumns])
    React.useEffect(() => {
        if (!isNil(sortable)) {
            if (_.isEmpty(sortable)) {
                dispatch(setColumns(initialColumns.map(el => ({ ...el, sort: 0, Header: () => <div style={{cursor: 'pointer'}} onClick={() =>{console.log(columns);sortDataCallback(el.accessor)}}>{el.Header}</div> }))))
            }
        }
    }, [initialColumns])
    console.log(columns)
    return { sort, 
        //stateColumns, 
        sortDataCallback }
}