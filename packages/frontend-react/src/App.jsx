import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { publicRoutes, privateRoutes } from './router/index.jsx'
import { initializeApp } from "./store/slices/appSlice.js"
import { useDispatch, useSelector } from "react-redux"
import {takeCurrentUser} from "./store/slices/userSlice";
import {isNil} from "lodash"

export default React.memo(function App() {

    const dispatch = useDispatch()

    const init = useSelector((state) => state.appSlice.init)

    const isAuth = !isNil(useSelector(takeCurrentUser)) ? true : false
    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!init) {
        return <></>
    }
    return (
        <>
                {isAuth ?
                    <Routes>
                        {privateRoutes.map(el =>
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