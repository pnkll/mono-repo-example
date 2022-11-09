import { ChevronDownIcon } from "@heroicons/react/solid"
import { compose } from "@reduxjs/toolkit"
import { withOverlay } from "@src/shared/UiKit/Select/withOverlay"
import { withStyles } from "@src/shared/UiKit/Select/lib/withStyles"
import { Formik } from "formik"
import _, { isNil } from "lodash"
import React, { useEffect, useState } from "react"
import ReactSelect, { components, NonceProvider } from "react-select"

const Select = React.forwardRef((props, ref) => {
    const { readOnly, styles, name, options, indicator, value, classNamePrefix, isMulti, onChange, setFieldValue, label, placeholder = 'Выберите..', ...other } = props
    function handleChange(option) {
        if (isMulti) {
            onChange
                ?onChange(option.map(opt => opt.value))
                :setFieldValue(name, option.map(opt => opt.value))
        } else {
            onChange
                ?onChange(option.value)
                :setFieldValue(name, option.value)
        }
    }
    return (
        <>
            <ReactSelect
                ref={ref}
                isDisabled={readOnly}
                placeholder={placeholder}
                isMulti={isMulti}
                classNamePrefix={classNamePrefix}
                value={options ? isMulti ? value.map(val => options.find(option => option.value === val)) : options.find(el => el.value === value) : ''}
                styles={styles}
                options={options}
                components={{ DropdownIndicator: () => indicator ? indicator : <ArrowsForSelectIcon style={{ paddingRight: '11px' }} /> }}
                onChange={handleChange}
                {...other} />
        </>
    )
})

const ArrowsForSelectIcon = ({ style }) => {
    return (
        <svg style={style} width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_0_11)">
                <g filter="url(#filter0_d_0_11)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.34284 0.171426C3.17141 -0.0428598 2.82856 -0.0428598 2.69998 0.171426L0.557127 2.74285C0.428555 2.87143 0.385698 3.04285 0.471412 3.17143C0.557127 3.34285 0.685698 3.42857 0.857127 3.42857H5.14284C5.31427 3.42857 5.44284 3.34285 5.52856 3.17143C5.61427 3 5.57141 2.82857 5.4857 2.7L3.34284 0.171426V0.171426Z" fill="#8C90A2" />
                </g>
                <g filter="url(#filter1_d_0_11)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.14283 5.14285H0.857118C0.68569 5.14285 0.557118 5.22857 0.471404 5.4C0.38569 5.57142 0.428547 5.74285 0.514261 5.87142L2.65712 8.44285C2.74283 8.52857 2.8714 8.61428 2.99998 8.61428C3.12855 8.61428 3.25712 8.57142 3.34283 8.44285L5.48569 5.87142C5.5714 5.74285 5.61426 5.57142 5.52855 5.4C5.44283 5.22857 5.31426 5.14285 5.14283 5.14285V5.14285Z" fill="#8C90A2" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_0_11" x="0.426819" y="0.0107117" width="5.14844" height="4.41785" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.72 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_11" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_11" result="shape" />
                </filter>
                <filter id="filter1_d_0_11" x="0.424683" y="5.14285" width="5.15057" height="4.47144" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.72 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_11" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_11" result="shape" />
                </filter>
                <clipPath id="clip0_0_11">
                    <rect width="6" height="9" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default withStyles(Select, 'Select')