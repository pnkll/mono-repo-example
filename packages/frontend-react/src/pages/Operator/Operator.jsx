import React from 'react';
import Client from '../../components/Client/Client.jsx';
import Control from '../../components/Control/Control.jsx';
import History from '../../components/History/History.jsx';
import Task from '../../components/Task/Task.jsx';
import SidebarHeaderLayout from '../../page_layouts/SidebarHeaderLayout/SidebarHeaderLayout.jsx';
import './Operator.scss'

export default React.memo(function Operator() {
    return (
        <>
            <SidebarHeaderLayout>
                <div className="operator-page__container">
                    <div className="operator-page__left__wrapper">
                        <div className="operator-page__client">
                            <Client />
                        </div>
                        <div className="operator-page__history">
                            <History />
                        </div>
                    </div>
                    <div className="operator-page__right__wrapper">
                        <div className="operator-page__control">
                            <Control/>
                        </div>
                        <div className="operator-page__task-edit">
                            <Task/>
                        </div>
                    </div>
                </div>
            </SidebarHeaderLayout>
        </>
    )
})