import { SocketProvider } from "@src/providers/Socket/SocketContext";
import { selectToken } from "@store/slices/appSlice";
import { useSelector } from "react-redux";

export function withSocket(Component,displayName){
    function Socket(props){
        const token=useSelector(selectToken)
        return(
            <SocketProvider token={token}>
                <Component {...props}/>
            </SocketProvider>
        )
    }
    Socket.displayName = displayName
    return Socket
}