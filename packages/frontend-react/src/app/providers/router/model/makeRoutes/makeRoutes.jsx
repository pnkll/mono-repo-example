
import { getRoutes } from "@src/app/providers/router/model/getRoutes/getRoutes"
import { selectToken } from "@store/slices/appSlice"
import { useSelector } from "react-redux"
import { useRoutes } from "react-router-dom"

// export function makeRoutes(Component, displayName) {

//     function Routes(props) {
//         const token = useSelector(selectToken)
//         const routes = getRoutes(token)
//         const router = useRoutes(routes)
//         return <Component router={router} {...props}/>
//     }
//     Routes.displayName = displayName
//     return Routes
// }