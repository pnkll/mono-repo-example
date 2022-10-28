import { ChevronDownIcon } from "@heroicons/react/solid"
import { Formik } from "formik"
import _, { isNil } from "lodash"
import React, { useEffect, useState } from "react"
import ReactSelect, { components, NonceProvider } from "react-select"

export default function Select({ options, indicator, formik,customStyles, classNamePrefix, id, name, isSearchable = false, menuPlacement = 'bottom', handleChange, label, isMulti = false, placeholder = 'Выберите..', isDisabled = false, defaultValue, selectedValue }) {

    const styles = customStyles || {
        container: (styles) => ({
            ...styles,
            width: '-webkit-fill-available',
            borderBottom: !isDisabled ? 0 : '1px solid #B8BBC6',
        }),
        option: (provided, state) => ({
            ...provided,
            background: state.isSelected ? 'linear-gradient(0deg, rgba(247, 249, 255, 0.25), rgba(247, 249, 255, 0.25)), linear-gradient(0deg, #197DD2, #197DD2), linear-gradient(180deg, #CDD1DF 0%, #E2E5F0 12.27%, #FFFFFF 100%)'
                : 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, #FFFFFF 0%, #E7E9F3 85.74%, #D8DBE7 100%)',
            border: state.isSelected && '1px solid #197DD2',
            boxShadow: state.isSelected && 'inset 0px 1px 2px rgba(0, 0, 0, 0.12)',
            background: state.isFocused && '#B3DCFD',
            color: state.isFocused && '#717686',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '14px',
            letterSpacing: '0.2px',
            color: state.isSelected && '#FFFFFF',
            textShadow: '0px 1px 0px rgba(0, 0, 0, 0.08)',
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            display: 'flex',
            cursor: 'pointer',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.82)), linear-gradient(180deg, #FFFFFF 0%, #E7E9F3 85.74%, #D8DBE7 100%)',
            border: isDisabled ? 0 : '1px solid #B8BBC6',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
            borderRadius: '4px 4px 0px 0px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '14px',
            letterSpacing: '0.6px',
            color: '#717686',
            textShadow: '0px 1px 0px rgba(255, 255, 255, 0.72)',
            height: 'fit-content',
            minHeight: '32px',
        }),
        menu: (styles) => ({
            ...styles,
            marginTop: "2px",
            background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, #FFFFFF 0%, #E7E9F3 85.74%, #D8DBE7 100%)',
            border: '1px solid #B8BBC6',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
            borderRadius: '0px 0px 4px 4px'

        }),
        menuList: (styles) => ({
            ...styles,
            padding: '0'
        }),
        indicatorSeparator: (styles) => ({
            display: 'none',
        }),
        indicatorsContainer: (styles) => ({
            ...styles,
            display: isDisabled ? 'none' : 'flex'
        }),
        singleValue: (styles) => ({
            ...styles,
            whiteSpace: isDisabled ? 'pre-wrap' : 'nowrap',
            margin: isDisabled ? 0 : '0 2px'
        }),
        valueContainer: (styles) => ({
            ...styles,
            padding: isDisabled ? '2px 0' : '2px 8px',
        })

    }
    const [key, setKey] = React.useState(1)
    const defValue = React.useMemo(()=>{
        if (isMulti) {
            return !_.isEmpty(options)
                ?!isNil(formik) 
                    &&defaultValue
                        ? formik.values[id].map(el => el && options.find(elem => elem.value === el))
                        : []
                :[]
        } else {
            return !isNil(formik) 
            ? options?.find(el => el.value === formik.values[id]) 
            : defaultValue 
                && options?.find(el => el.value === selectedValue)
        }
    },[options])
    React.useLayoutEffect(() => {
        !isNil(defValue) && setKey(v => v + 1)
    }, [defValue])
    return (
        <>
            <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                {!isNil(label) && <label style={{ padding: '5px' }}>{label}</label>}
                <ReactSelect
                    key={key}
                    isDisabled={isDisabled}
                    placeholder={placeholder}
                    isMulti={isMulti}
                    isSearchable={isSearchable}
                    id={id}
                    name={name}
                    classNamePrefix={classNamePrefix}
                    styles={styles}
                    options={options}
                    defaultValue={defaultValue ? defValue : null}
                    components={{ DropdownIndicator: () => indicator ? indicator : <ArrowsForSelectIcon style={{ paddingRight: '11px' }} /> }}
                    onChange={(e) => !isNil(formik) ? isMulti ? formik.setFieldValue(id, e.map(el => el.value)) : formik.setFieldValue(id, e.value) : handleChange(e.value)}
                    menuPlacement={menuPlacement} />
            </div>
        </>
    )
}
export const ArrowsForSelectIcon = ({ style }) => {
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