import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';

export default function HeaderSort({header,columns,setColumns,sortDataCallback}) {

    // function sortData(key){
    //     setColumns(columns.map(el=>el.type==='sort'&&key===el.accessor?{...el, sort: el.sort===1?-1:1}:el.type==='sort'?{...el, sort: 0}:el))
    // }

    return (
        <>
            <div onClick={() => sortDataCallback(header.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {header.sort === 1
                    ? <ChevronUpIcon width={20} />
                    : <ChevronDownIcon width={20} />}
                {header.Header}
            </div>
        </>
    )
}