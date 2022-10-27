import React from "react";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import FileInput from "../../components/FileInput/FileInput.jsx";
import DragNDropInput from "../../components/DragNDropInput/DragNDropInput.jsx";

export default function Main() {

    return (
        <>
            <TransitionLayout>
                main
                    <FileInput resumableId={'file'} options={{fileType: ['csv']}} multiple={true} accept={'.csv'}/>
                    <div className="" style={{width:500,height: 300,border: '1px solid'}}>
                        <DragNDropInput resumableId={'table'}/>
                    </div>
            </TransitionLayout>
        </>
    )
}