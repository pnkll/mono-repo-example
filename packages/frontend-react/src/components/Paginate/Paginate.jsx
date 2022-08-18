import ReactPaginate from "react-paginate"
import React from "react"
import './Paginate.scss'
import {ArrowCircleLeftIcon, ArrowCircleRightIcon, DotsHorizontalIcon} from '@heroicons/react/solid'

export default React.memo(function Paginate({ setPage, page, itemsCount, totalItemsCount, className, pageClassName, activeClassName, previousClassName, nextClassName,breakLabel,nextLabel,previousLabel }) {
    return (
        <ReactPaginate
            pageCount={Math.ceil(totalItemsCount / itemsCount)}
            pageRangeDisplayed={10}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected+1)}
            previousLabel={previousLabel || <ArrowCircleLeftIcon width={20}/>}
            nextLabel={nextLabel || <ArrowCircleRightIcon width={20}/>}
            breakLabel={breakLabel || <DotsHorizontalIcon width={20}/>}
            className={className || 'paginate'}
            pageClassName={pageClassName || 'elem'}
            activeClassName={activeClassName || 'active'}
            previousClassName={previousClassName || 'previos'}
            nextClassName={nextClassName || 'next'}
            forcePage={page-1}/>
    )
})