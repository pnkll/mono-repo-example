import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { publicRoutes, privateRoutes } from './router/index.jsx'
import { initializeApp } from "./store/slices/appSlice.js"
import { useDispatch, useSelector } from "react-redux"

export default React.memo(function App() {

    const dispatch = useDispatch()

    const init = useSelector((state) => state.appSlice.init)

    const isAuth = false
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
                            <Route key={el.path} element={el.component} path={el.path} />)}
                        {/* <Route path='*' element={<NotFoundPage/>} /> */}
                    </Routes>
                    :
                    <Routes>
                        {publicRoutes.map(el =>
                            <Route key={el.path} element={el.component} path={el.path} />)}
                        {/* <Route path='*' element={<Navigate to='signin' />} /> */}
                    </Routes>
                }
        </>
    )
})