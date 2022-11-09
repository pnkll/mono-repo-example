import React from 'react'

export function withStyles(Component, displayName){

    const RenderSelect= React.forwardRef((props,ref)=>{
        const styles = props.customStyles || {
            container: (styles) => ({
                ...styles,
                width: '-webkit-fill-available',
                borderBottom: !props.isDisabled ? 0 : '1px solid #B8BBC6',
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
                border: props.isDisabled ? 0 : '1px solid #B8BBC6',
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
                display: props.isDisabled ? 'none' : 'flex'
            }),
            singleValue: (styles) => ({
                ...styles,
                whiteSpace: props.isDisabled ? 'pre-wrap' : 'nowrap',
                margin: props.isDisabled ? 0 : '0 2px'
            }),
            valueContainer: (styles) => ({
                ...styles,
                padding: props.isDisabled ? '2px 0' : '2px 8px',
            })
    
        }
        return <Component {...props} styles={styles} ref={ref}/>
    })
    RenderSelect.displayName = displayName

    return RenderSelect
}  
