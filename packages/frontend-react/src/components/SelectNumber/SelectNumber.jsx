import { ChevronDownIcon } from '@heroicons/react/solid';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select'

export default React.memo(function SelectNumber({ styles, values, defaultValue,handleChange,menuPlacement='top' }) {
    const customStyles = styles ? styles : {
        control: (styles) => ({
            ...styles,
            fontSize: '13px',
            border: 0,
            boxShadow: '0 0 0 0',
            minHeight: '20px',
            ':hover': {
                border: '0 !important',
                borderColor: 'white',
                boxShadow: '0 0 0 0',
            }
        }),
        option: (styles) => ({
            ...styles,
            padding: '5px 0',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '13px',
            
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        valueContainer: (styles) => ({
            ...styles,
            padding: 0,
        }),
        menu: (styles) => ({
            ...styles,
            marginTop: 0,
            border: '1px solid #2684ff',
            boxShadow: '0 0 0 0',
            left: '-7px',
        }),
        menuList: (styles) => ({
            ...styles,
            margin: 0,
            border: 0,
        }),
        input: (styles) =>({
            ...styles,
            caretColor: 'white'
        })
    }
    const [options, setOptions] = useState([])
    useEffect(() => {
        setOptions(values.map(value => value && { value: value, label: value }))
    }, [values])
    return (
        <>
            {options.length > 0 &&
                <ReactSelect styles={customStyles}
                    options={options}
                    menuPlacement={menuPlacement}
                    defaultValue={!isNil(defaultValue) ? options.find(option => option.value === defaultValue)?options.find(option => option.value === defaultValue):options[0]:options[0]}
                    components={{ DropdownIndicator: () => <ChevronDownIcon width={15} style={{rotate: menuPlacement==='top'?'180deg':'0deg'}} /> }} 
                    onChange={(e)=>handleChange(e.value)}/>
            }
        </>
    )
})