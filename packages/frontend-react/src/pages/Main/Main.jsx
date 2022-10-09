import React from "react";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import Select from '../../components/Select/Select'
import Multiselect from "multiselect-react-dropdown";
import { setResumable, UploadContext } from "../../Providers/UploadNotify.jsx";

export default function Main() {
    const [state,dispatch,r]=React.useContext(UploadContext)
    React.useEffect(()=>{
        dispatch(setResumable('img'))
    },[])
    return (
        <>
            <TransitionLayout>
                main
                <input type='file' onChange={(e)=>r.addFiles(e.target.files)}/>
            </TransitionLayout>
        </>
    )
}