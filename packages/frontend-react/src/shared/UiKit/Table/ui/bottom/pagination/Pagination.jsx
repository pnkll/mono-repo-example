import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { setPage, useTrackedTable } from '@src/shared/UiKit/Table/provider/index'
import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

export default function Pagination() {
    const [{ totalDocs, limit, page }, dispatch] = useTrackedTable()
    function handleChange(page) {
        dispatch(setPage(page))
    }
    return (
        <>
            <ReactPaginate
                pageCount={Math.ceil(totalDocs / limit)}
                pageRangeDisplayed={10}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => handleChange(selected + 1)}
                previousLabel={<ChevronDoubleLeftIcon width={15} />}
                nextLabel={<ChevronDoubleRightIcon width={15} />}
                breakLabel={<DotsHorizontalIcon width={15} />}
                className={s.paginate}
                pageClassName={s.elem}
                activeClassName={s.active}
                previousClassName={s.previous}
                nextClassName={s.next}
            // forcePage={page - 1}
            />
        </>
    )
}