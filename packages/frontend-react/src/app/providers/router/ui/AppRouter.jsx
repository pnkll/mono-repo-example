import { compose } from "@reduxjs/toolkit";
import { getRoutes } from "@src/app/providers/router/model/getRoutes/getRoutes";
import { makeRoutes } from "@src/app/providers/router/model/makeRoutes/makeRoutes";
import { withRouter } from "@src/app/providers/router/model/withRouter/withRouter";
import { selectToken } from "@store/slices/appSlice";
import { useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";

function AppRouter() {
    const router = useRoutes(getRoutes())
    return (
        <>
            {router}
        </>
    )
}

export default AppRouter 
//withRouter(AppRouter, 'AppRouter')