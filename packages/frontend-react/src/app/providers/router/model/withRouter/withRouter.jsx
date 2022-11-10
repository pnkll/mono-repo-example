import { BrowserRouter } from "react-router-dom";

export function withRouter(Component, displayName) {
    function Router(props) {
        return (
            <BrowserRouter>
                <Component {...props} />
            </BrowserRouter>
        )
    }
    Router.displayName = displayName + 'WithRouter'
    return Router
}