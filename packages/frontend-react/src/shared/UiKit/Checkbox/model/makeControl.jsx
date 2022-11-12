export function makeControl(Component, displayName) {
    function Control({ form, field, onBlur, onChange, value, name, ...other }) {
        const handleChange = ({ target }) => {
            form
                ? form.setFieldValue(field.name, target.checked)
                : onChange&&onChange(target.checked)
        }
        const handleBlur = (e)=>{
            field
                ?field.onBlur(e)
                :onBlur&&onBlur(e)
        }
        return <Component
            name={field?.name||name}
            value={field ? field.value : value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...other}
        />
    }
    Control.displayName = displayName + 'WithControl'
    return Control
}