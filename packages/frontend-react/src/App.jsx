import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { publicRoutes, privateRoutes } from './router/index.jsx'
import { initializeApp, selectToken } from "./store/slices/appSlice.js"
import { useDispatch, useSelector } from "react-redux"
import {isNil} from "lodash"
import { usersApi } from "./services/UsersService.js"
import { selectCurrentUser, setUser } from "./store/slices/userSlice.js"

export default React.memo(function App() {

    const {data,error,isLoading}=usersApi.useGetProfileQuery()

    const dispatch = useDispatch()

    const init = useSelector((state) => state.appSlice.init)
    const user = useSelector(selectCurrentUser)
    !isLoading&&dispatch(setUser(data.message))

    const isAuth = !isNil(useSelector(selectToken)) ? true : false
    useEffect(() => {
        !isLoading&&dispatch(initializeApp())
    }, [isLoading])

    if (!init) {
        return <></>
    }
    return (
        <>
                {isAuth ?
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