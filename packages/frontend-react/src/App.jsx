import React, { useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { initializeApp, selectInitApp, selectToken } from "./store/slices/appSlice.js"
import { useDispatch, useSelector } from "react-redux"
import {isNil} from "lodash"
import { usersApi } from "./services/UsersService.js"
import { rolesApi } from "./services/RolesService.js"
import { routes } from "./router/routes.jsx"

export default React.memo(function App() {

    const [fetchGetProfile]=usersApi.useLazyGetProfileQuery()
    const [fetchGetRoles]=rolesApi.useLazyGetRolesQuery()
    const [fetchGetPermissions]=rolesApi.useLazyGetPermissionsQuery()

    async function getProfile(){
        await fetchGetProfile()
    }
    async function getRoles(){
        await fetchGetRoles()
    }
    async function getPermissions(){
        await fetchGetPermissions()
    }

    const token = useSelector(selectToken)
    const init = useSelector(selectInitApp)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isNil(token)){
            getProfile()
            getRoles()
            getPermissions()
        }
        !init&&dispatch(initializeApp(true))
    }, [token])

    if (!init) {
        return <>Preloader</>
    }
    const router = useRoutes(routes(token))
    
    return router
})