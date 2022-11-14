import React from "react"
import { selectDarkMode } from "@store/slices/appSlice.js"
import { useSelector } from "react-redux"
import cn from 'classnames'
import { withSocket } from "@src/providers/Socket/hoc/withProvider"
import AppRouter from "@src/app/providers/router/ui/AppRouter"
import { compose } from "@reduxjs/toolkit"
import { withStore } from "@src/app/providers/store/ui/withStore"
import { withResumable } from "@src/app/providers/resumable/index"
import { withRouter } from "@src/app/providers/router/model/withRouter/withRouter"

function App() {

    const darkMode = useSelector(selectDarkMode)
    console.log('app')
    return (
        <div
            className={cn("app", { dark: darkMode, light: !darkMode })} 
            id='app'
        >
            <AppRouter />
        </div>)
}

export default compose(withRouter, withStore, withSocket, withResumable)(App, 'App')