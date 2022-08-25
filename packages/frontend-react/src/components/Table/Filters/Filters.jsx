import { AdjustmentsIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React from 'react';
import Button from '../../Button/Button.jsx';

export default React.memo(function Filters({ classNamePrefix = 'table', filters, setFilters }) {
    return (
        <>
            <div className={`${classNamePrefix}__filters__container`}>
                <div className={`${classNamePrefix}__filters__group`}>
                    {!isNil(filters) && filters.map((filter, index) => <button
                        key={index}
                        disabled={filter.status}
                        className={`${classNamePrefix}__filters__group__elem ${filter.status ? 'active' : ''}`}
                        onClick={() => setFilters(filters.map((el) => el.title === filter.title ? { ...el, status: true } : { ...el, status: false }))}
                    >{filter.title}</button>)}
                </div>
                <div className={`${classNamePrefix}__filters__control`}>
                    <AdjustmentsIcon width={20} style={{ rotate: '90deg', cursor: 'pointer' }} />
                    <Button text='Создать' classNamePrefix={'table__filters button'} />
                </div>
            </div>
        </>
    )
})