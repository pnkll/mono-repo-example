import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button.jsx";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import { addNotify, selectNotifications } from "../../store/slices/notificationsSlice.js";

export default function Main() {
    const dispatch = useDispatch()
    function addNotification(){
        dispatch(addNotify({type: 'success', message: 'hello world'}))
    }
    return (
        <>
                <TransitionLayout>
                    main
                    <Button text='Добавить уведку' handleClick={addNotification}/>
                </TransitionLayout>
        </>
    )
}