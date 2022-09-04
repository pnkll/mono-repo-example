import React, { useState } from "react";
import SidebarHeaderLayout from "../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";

export default React.memo(function Main() {

    return (
        <>
            <SidebarHeaderLayout>
                <TransitionLayout>
                    main
                </TransitionLayout>
            </SidebarHeaderLayout>
        </>
    )
})