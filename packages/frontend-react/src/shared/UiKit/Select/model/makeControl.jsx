import React from "react"

export function makeControl(Component, displayName) {
    const Control = React.forwardRef(({ form, field, onChange, value, isMulti, onBlur, options, ...other },ref) =>{
        function handleChange(e) {
            if (isMulti) {
                form
                    ? form.setFieldValue(field.name, e.map(opt=>opt.value))
                    : onChange && onChange(e.map(opt=>opt.value))
            } else {
                form
                    ? form.setFieldValue(field.name, e.value)
                    : onChange && onChange(e.value)
            }
        }
        function handleBlur(e) {
            field
                ? field.onBlur(e)
                : onBlur && onBlur(e)
        }
        const val = options
            ? isMulti
                ? field
                    ? field.value.map(val => options.find(option => option.value === val))
                    : value.map(val => options.find(option => option.value === val))
                : field
                    ? options.find(el => el.value === field.value)
                    : options.find(el => el.value === value)
            : ''
        return (
            <Component
                name={field?.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={val}
                options={options}
                isMulti={isMulti}
                ref={ref}
                {...other}
            />
        )
    })
    Control.displayName = displayName + 'MakeControl'
    return Control
}