import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { isNil } from 'lodash';
import React, { useState } from 'react';
import Toggle from 'react-toggle'
import './ToggleInput.scss'

export default React.memo(function ToggleInput({ formik, label, checked = false, id, name }) {
    return (
        <>
            <Toggle
                id={id}
                name={name}
                checked={formik.values[id]}
                onChange={formik.handleChange}
            />
        </>
    )
})