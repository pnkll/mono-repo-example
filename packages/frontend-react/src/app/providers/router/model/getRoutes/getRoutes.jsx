import { noAuthRoutes } from "@src/app/providers/router/model/routes/noAuthRoutes"
import { authRoutes } from "@src/app/providers/router/model/routes/authRoutes"
import { useSelector } from "react-redux"
import { selectToken } from "@store/slices/appSlice"


export const getRoutes = () => {
    const tok = useSelector(selectToken)
    if (tok) {
        return authRoutes
    } else {
        return noAuthRoutes
    }
}