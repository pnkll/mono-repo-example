import ReactPaginate from "react-paginate"
import React from "react"
import './Paginate.scss'
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon, DotsHorizontalIcon} from '@heroicons/react/solid'
import { useContext } from "react"
import { TableContext } from "../../Providers/Table/TableContext"
import { setEditMode, setPage } from "../../Providers/Table/TableReducer"

export default function Paginate({ 
    className, pageClassName, 
    activeClassName, previousClassName, nextClassName,breakLabel,nextLabel,
    previousLabel }) {
    const [{totalDocs,limit,page,addContent},dispatch]=useContext(TableContext)
    function handleChange(page){
        addContent.editMode&&dispatch(setEditMode())
        dispatch(setPage(page))
    }
    return (
        <ReactPaginate
            pageCount={Math.ceil(totalDocs / limit)}
            pageRangeDisplayed={10}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => handleChange(selected+1)}
            previousLabel={previousLabel || <ChevronDoubleLeftIcon width={15}/>}
            nextLabel={nextLabel || <ChevronDoubleRightIcon width={15}/>}
            breakLabel={breakLabel || <DotsHorizontalIcon width={15}/>}
            className={className || 'paginate'}
            pageClassName={pageClassName || 'elem'}
            activeClassName={activeClassName || 'active'}
            previousClassName={previousClassName || 'previos'}
            nextClassName={nextClassName || 'next'}
            forcePage={page-1}/>
    )
}