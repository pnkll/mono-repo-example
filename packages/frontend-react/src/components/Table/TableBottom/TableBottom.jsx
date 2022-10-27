import React from 'react';
import { setLimit, useTrackedTable } from '../../../Providers/Table/TableContext';
import Paginate from '../Paginate/Paginate';
import SelectNumber from '../../SelectNumber/SelectNumber';
import s from './TableBottom.module.scss'

export default function TableBottom({data}) {
    const [{page,limit,totalDocs},dispatch]=useTrackedTable()
    return (
        <div className={s["table__bottom"]} style={{ justifyContent: totalDocs > limit ? 'space-between' : 'flex-end' }}>
            {!_.isEmpty(data)
                && totalDocs > limit
                && <Paginate
                    //setPage={setCurrentPage}
                    //page={currentPage}
                    //itemsCount={itemsCount}
                    //totalItemsCount={totalItemsCount} 
                    />}
            {!_.isEmpty(data)
                && <div className={s["table__bottom__counts"]}>
                    <SelectNumber
                        defaultValue={limit}
                        values={[5, 10, 15, 20]}
                        handleChange={(value)=>dispatch(setLimit(value))} />
                    <p className={s["table__bottom__counts__info"]}>{((page - 1) * limit) + 1}&nbsp;—&nbsp;{(limit * page) > totalDocs
                        ? totalDocs
                        : limit * page} из {totalDocs} записей</p>
                </div>}
        </div>
    )
}