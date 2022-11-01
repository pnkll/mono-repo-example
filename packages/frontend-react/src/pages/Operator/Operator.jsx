import ContentItemOverlay from '@src/overlays/ContentItemOverlay/ContentItemOverlay';
import TransitionOverlay from '@src/overlays/TransitionOverlay/TransitionOverlay';
import React from 'react';
import Client from '../../components/Client/Client.jsx';
import Task from '../../components/Task/Task.jsx';
import './Operator.scss'

export default function Operator() {
    return (
        <>
                <TransitionOverlay>
                    <div className="operator-page__container">
                        <div className="operator-page__left__wrapper">
                            <div className="operator-page__client">
                                <Client />
                            </div>
                            {/* <div className="operator-page__history">
                                <History />
                            </div> */}
                        </div>
                        <div className="operator-page__right__wrapper">
                            <div className="operator-page__control">
                                <ContentItemOverlay label='Обращение'>
                                    shjaddhsak
                                </ContentItemOverlay>
                            </div>
                            <div className="operator-page__task-edit">
                                <Task />
                            </div>
                        </div>
                    </div>
                </TransitionOverlay>
        </>
    )
}