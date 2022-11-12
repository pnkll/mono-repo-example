export function withConfig(Component, displayName) {
    function Config({ name, form, field, onChange, onBlur, value, ...other }) {
        const error = form?.touched[field.name] && form?.errors[field.name]
        const valid = form?.touched[field.name] && !form?.errors[field.name]
        function handleChange(e) {
            field
                ? field.onChange(e)
                : onChange(e.target.value)
        }
        function handleBlur(e) {
            field
                ? field.onBlur(e)
                : onBlur&&onBlur(e)
        }         
        return (
            <Component
                name={field?.name}
                valid={valid}
                error={error}
                onChange={handleChange}
                value={field?field.value:value}
                onBlur={handleBlur}
                {...other}
            />
        )
    }
    Config.displayName = displayName + 'WithConfig'
    return Config
}