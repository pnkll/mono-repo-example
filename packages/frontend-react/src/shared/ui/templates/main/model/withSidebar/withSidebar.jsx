// import { ProSidebarProvider } from "react-pro-sidebar";

export function withSidebar(Component,displayName){
    function Sidebar(){
        return(
            // <ProSidebarProvider>
                <Component/>
            // </ProSidebarProvider>
        )
    }
    Sidebar.displayName=displayName+'WithSidebar'
    return Sidebar
}