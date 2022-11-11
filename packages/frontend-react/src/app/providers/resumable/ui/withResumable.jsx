import { ResumableProvider } from "@src/app/providers/resumable/config/container";

export function withResumable(Component,displayName){
    function Resumable(props){
        return (
            <ResumableProvider>
                <Component {...props}/>
            </ResumableProvider>
        )
    }
    Resumable.displayName = displayName+'WithResumable'
    return Resumable
}