import { XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React from 'react';
import Button from '../Button/Button.jsx';

export default function NavTableTd({ href,handleRemove,id }) {
    return (
        <>
            <div style={{ display: 'flex', gap: 10 }}>
                <i style={{ display: 'flex', alignItems: 'center' }}>
                    {!isNil(handleRemove)&&<XIcon width={20} color='red' style={{ cursor: 'pointer' }} onClick={() => handleRemove(id)} />}
                </i>
                <Button color='green' text='Перейти' href={href} />

            </div>
        </>
    )
}