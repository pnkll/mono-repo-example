import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { publicRoutes, privateRoutes } from './router/index.jsx'
import { initializeApp, selectInitApp, selectToken } from "./store/slices/appSlice.js"
import { useDispatch, useSelector } from "react-redux"
import {isNil} from "lodash"
import { usersApi } from "./services/UsersService.js"
import { selectCurrentUser, setUser } from "./store/slices/userSlice.js"
import { rolesApi } from "./services/RolesService.js"

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
    const user = useSelector(selectCurrentUser)
    
    const dispatch = useDispatch()

    const isAuth = !isNil(useSelector(selectToken)) ? true : false
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
    return (
        <>
                {isAuth?
                    <Routes>
                        {!isNil(user)&&privateRoutes.map(el =>
                            <Route key={el.path} element={el.element} path={el.path} breadcrumb={el.breadcrumb}/>)}
                        {/* <Route path='*' element={<NotFoundPage/>} /> */}
                    </Routes>
                    :
                    <Routes>
                        {publicRoutes.map(el =>
                            <Route key={el.path} element={el.element} path={el.path} />)}
                        {/* <Route path='*' element={<Navigate to='signin' />} /> */}
                    </Routes>
                }
        </>
    )
})