import React, { useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { initializeApp, selectDarkMode, selectInitApp, selectToken } from "./store/slices/appSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { isNil } from "lodash"
import { usersApi } from "./services/UsersService.js"
import { rolesApi } from "./services/RolesService.js"
import { routes } from "./router/routes.jsx"
import cn from 'classnames'
import { SocketProvider } from "@src/providers/Socket/SocketContext"
import { withSocket } from "@src/providers/Socket/hoc/withProvider"
import AppRouter from "@src/app/providers/router/ui/AppRouter"
import { compose } from "@reduxjs/toolkit"
import { withStore } from "@src/app/providers/store/ui/withStore"
import { withResumable } from "@src/app/providers/resumable/index"

function App() {

    const [getProfile, { isSuccess: isSuccessProfile }] = usersApi.useLazyGetProfileQuery()
    // const [getRoles] = rolesApi.useLazyGetRolesQuery()
    // const [getPermissions] = rolesApi.useLazyGetPermissionsQuery()

    const token = useSelector(selectToken)
    const init = useSelector(selectInitApp)
    const darkMode = useSelector(selectDarkMode)

    const dispatch = useDispatch()

    async function getCommon() {
        await getProfile()
        // await getRoles()
        // await getPermissions()
    }

    useEffect(() => {
        if (!isNil(token)) {
            getCommon()
        }
        !init && dispatch(initializeApp(true))
    }, [token])

    if (!init) {
        return <>Preloader</>
    }

    return( 
    //(token ? isSuccessProfile : true) &&
        <div 
        className={cn("app", { dark: darkMode, light: !darkMode })} id='app'
        >
                <AppRouter/>
        </div>)
}

export default compose(withStore,withSocket,withResumable)(App,'App')