import FileInput from "../../components/FileInput/FileInput.jsx";
import DragNDropInput from "../../components/DragNDropInput/DragNDropInput.jsx";
import TransitionOverlay from "@src/overlays/TransitionOverlay/TransitionOverlay";
import { useSocket } from "@src/providers/Socket/SocketContext";
import React from 'react'
import { useTrackedResumable } from "@src/Providers/Resumable/ResumableContext";
import Button from "@components/Button/Button";

export default function Main() {

    const io = useSocket()

    function handleClick(){
        io.on("test", (data) => {
            console.log(data)
              setUserName(data)
          });
        io.emit("join", { nickname:'test', room: "default" }, (error) => {
            console.log("nickname joined 'join'", nickname);
            if (error) {
                alert(error.error);
            }
            });
    }



    return (
        <>
            <TransitionOverlay>
                main
                <Button text='conn' handleClick={()=>io.connect()}/>
                <Button text='jfds' handleClick={handleClick}/>
                <FileInput resumableId={'file'} options={{ fileType: ['csv'] }} multiple={true} accept={'.csv'} />
                <div className="" style={{ width: 500, height: 300, border: '1px solid' }}>
                    <DragNDropInput resumableId={'table'} />
                </div>
            </TransitionOverlay>
        </>
    )
}