import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../router/index.jsx'

export default React.memo(function Router(){

    const isAuth = true

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