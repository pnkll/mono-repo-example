import { selectTheme } from "@src/features/theme/toogle-theme/model/selectTheme"
import { setDarkMode } from "@store/slices/appSlice"
import { useDispatch } from "react-redux"

export function withToggle(Component,displayName){
    function Toggle(){
        const dispatch = useDispatch()
        const theme=selectTheme()
        function setTheme(){
            dispatch(setDarkMode())
        }
        return <Component callback={setTheme} theme={theme}/> 
    }
    Toggle.displayName = displayName+'WithToggle'
    return Toggle
}