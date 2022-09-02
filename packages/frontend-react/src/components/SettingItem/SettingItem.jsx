import { isNil } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import TwoColumnItemLayout from '../../layouts/TwoColumnItemLayout/TwoColumnItemLayout.jsx';
import './SettingItem.scss'

export default React.memo(function SettingItem({ label, items}) {
    return (
        <>
            <TwoColumnItemLayout label={label}>
                <ul className='setting__options__wrapper'>
                    {!isNil(items) && items.map((item, index) => <Link key={index} to={item.href}><li className='setting__options__elem'>
                        {!isNil(item.icon) && item.icon}{item.label}
                    </li></Link>)}
                </ul>
            </TwoColumnItemLayout>
        </>
    )
})