import FileInput from "../../components/FileInput/FileInput.jsx";
import DragNDropInput from "../../components/DragNDropInput/DragNDropInput.jsx";
import TransitionOverlay from "@src/overlays/TransitionOverlay/TransitionOverlay";
import { useSocket } from "@src/providers/Socket/SocketContext";
import React from 'react'
import { useTrackedResumable } from "@src/Providers/Resumable/ResumableContext";

export default function Main() {
    return (
        <>
            <TransitionOverlay>
                main
                <FileInput resumableId={'file'} options={{ fileType: ['csv'] }} multiple={true} accept={'.csv'} />
                <div className="" style={{ width: 500, height: 300, border: '1px solid' }}>
                    <DragNDropInput resumableId={'table'} />
                </div>
            </TransitionOverlay>
        </>
    )
}