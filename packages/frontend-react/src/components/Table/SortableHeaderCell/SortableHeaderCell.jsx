import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';
import { useContext } from 'react';
import { TableContext } from '../../../Providers/Table/TableContext';
import { setSort } from '../../../Providers/Table/TableReducer';

export default function SortableHeaderCell({ column }) {

    const [{ sort }, dispatch] = useContext(TableContext)

    function sortDataCallback(key) {
        if (Object.keys(sort)[0] === key) {
            if (sort[key] === 1) {
                dispatch(setSort({ [key]: -1 }))
            } else {
                dispatch(setSort({ [key]: 1 }))
            }
        } else {
            dispatch(setSort({ [key]: -1 }))
        }
    }

    function renderArrow(sortValue) {
        if (sortValue === 1) {
            return <ChevronUpIcon width={20} />
        } else {
            return <ChevronDownIcon width={20} />
        }
    }

    return (
        <>
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => sortDataCallback(column.accessor)}>
                {column.Header}{Object.keys(sort)[0] === column.accessor ? renderArrow(sort[column.accessor]):null}
            </div>
        </>
    )
}