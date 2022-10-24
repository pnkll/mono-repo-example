import React from 'react';
import s from './FillRow.module.scss'

export default function FillRow({headerGroups}) {
    return (
        <>
            <tr className={s['fill-row__container']}>
                <td colSpan={headerGroups[headerGroups.length - 1].headers.length} />
            </tr>
        </>
    )
}