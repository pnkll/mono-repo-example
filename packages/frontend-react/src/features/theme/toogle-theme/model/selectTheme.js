import { selectDarkMode } from "@store/slices/appSlice"
import _ from "lodash"
import { useSelector } from "react-redux"

export const selectTheme = () => {
    const mode = useSelector(selectDarkMode)
    if(mode){
        return 'dark'
    } else{
        return 'light'
    }
    return null
}