import { AdjustmentsIcon, ChevronDownIcon, MinusIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React from 'react';
import Button from '../../Button/Button.jsx';

export default React.memo(function Filters({ classNamePrefix = 'table', filters, setFilters, handleOpen, isOpen, setVis, vis, setFilterData, buttons }) {
    return (
        <>
            <div className={`${classNamePrefix}__filters__container`}>
                <div className={`${classNamePrefix}__filters__group`}>
                    {!isNil(filters) && filters.map((filter, index) => <button
                        key={index}
                        disabled={filter.status}
                        className={`${classNamePrefix}__filters__group__elem ${filter.status ? 'active' : ''}`}
                        onClick={() => setFilters(filters.map((el) => el.title === filter.title
                            ? { ...el, status: true }
                            : { ...el, status: false }))}
                    >{filter.title}</button>)}
                </div>
                <div className={`${classNamePrefix}__filters__control`}>
                    {!isNil(buttons) && buttons.map((el,index) => <Button key={index} classNamePrefix={el.className?el.className:'button'} text={el.text} handleClick={el.callback} color={el.color} href={el.href} />)}
                    {isOpen
                        ? <MinusIcon width={20} style={{ marginTop: 'auto', cursor: 'pointer' }} onClick={() => handleOpen(!isOpen)} />
                        : <ChevronDownIcon width={20} style={{ marginTop: 'auto', cursor: 'pointer' }} onClick={() => handleOpen(!isOpen)} />}
                    {!isNil(setFilterData)
                        && <div className="" onClick={() => setVis(!vis)} style={{ cursor: 'pointer' }}>
                            <AdjustmentsIcon width={20} style={{ rotate: '90deg', cursor: 'pointer' }} />
                        </div>}

                </div>
            </div>
        </>
    )
})