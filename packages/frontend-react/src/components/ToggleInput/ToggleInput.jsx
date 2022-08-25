import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React, { useState } from 'react';
import Toggle from 'react-toggle'
import './ToggleInput.scss'

export default React.memo(function ToggleInput({ formik, label, checked = false, id, name, classNamePrefix }) {
    const className = classNamePrefix || 'toggle-input'
    return (
        <>
            <div className={`${className}__container`} style={{display: 'flex', gap: '10px'}}>
                <Toggle
                    id={id}
                    name={name}
                    checked={formik.values[id]}
                    onChange={formik.handleChange}
                />
                {!isNil(label)&&<p style={{margin: 0}}>{label}</p>}
            </div>
        </>
    )
})