export function makeControl(Component,displayName){
    function Control({field,form,value,onChange,onBlur,...other}){
        const handleChange = (value)=>{
            form
                ?form.setFieldValue(field.name,value)
                :onChange&&onChange(value)
        }
        const handleBlur = (e)=>{
            field
                ?field.onBlur(e)
                :onBlur(e)
        }
        return(
            <Component
                name={field?.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={field?field.value:value}
                {...other}
            />
        )
    }
    Control.displayName=displayName+'WithControl'
    return Control
}