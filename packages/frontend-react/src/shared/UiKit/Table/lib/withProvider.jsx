import { TableProvider } from "../provider/index";

export function withProvider(Component,displayName){
    function Provider(props){
        return <TableProvider>
            <Component {...props}/>
        </TableProvider>
    }
    Provider.displayName=displayName+'WithProvider'
    return Provider
}