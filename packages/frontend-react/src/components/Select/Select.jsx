import { ChevronDownIcon } from "@heroicons/react/solid"
import React, { useState } from "react"
import ReactSelect, { components } from "react-select"

export default React.memo(function Select({ options, indicator, handleChange, defaultValue, customStyles,}) {

    const defaultStyles = customStyles || {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'red' : 'blue',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            background: state.isFocused && '#B3DCFD',
            cursor: 'pointer'
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            display: 'flex',
            border: '1px solid black',
            borderRadius: '4px',
            fontFamily: 'Roboto',
            cursor: 'pointer'
        }),
        menu: (styles) => ({
            ...styles,
            borderRadius: 0,
            marginTop: "5px",
            borderRadius: '0 4px 4px',
            fontSize: '14px',

        }),
        menuList: (styles) => ({
            ...styles,
            padding: '0'
        }),
        valueContainer: (styles) => ({
            ...styles,
            fontSize: '14px'
        })

    }

    const [styles, setStyles] = useState(customStyles || defaultStyles)

    return (
        <>
            <ReactSelect
                styles={styles}
                options={options}
                components={{ DropdownIndicator: () => indicator?indicator:<ChevronDownIcon width={25} /> }}
                onChange={handleChange}
                defaultValue={defaultValue} />
        </>
    )
})