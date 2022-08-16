import React from "react"
import { BrowserRouter, Routes, useNavigate } from "react-router-dom"
import Demo from "../pages/Demo.jsx"
import Router from "../components/Router.jsx"

export default React.memo(function Main() {

    //const navigate = useNavigate()

    return (
        <>
            {/* <BrowserRouter>
                <div className="flex flex-row" onClick={(e)=>useNavigate('demo')}>
                    Hello
                </div>
                <div className="nav">
                    <Routes>
                        <Route path='demo' element={<Demo/>}/>
                    </Routes>
                </div>
            </BrowserRouter> */}
            <Router/>
        </>
    )
})