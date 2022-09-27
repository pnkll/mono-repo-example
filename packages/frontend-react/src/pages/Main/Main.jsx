import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button.jsx";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import { usersApi } from "../../services/UsersService.js";
import { addNotify, selectNotifications } from "../../store/slices/notificationsSlice.js";

export default function Main() {
    const dispatch = useDispatch()
    function addNotification(){
        dispatch(addNotify({type: 'success', message: 'hello world'}))
    }
    const [confirmUsers,{data: status}]=usersApi.useConfirmUsersMutation()
    console.log(status)
    useEffect(()=>{
        confirmUsers(['632db5a0a457c421276b7ab0'])
    },[])
    return (
        <>
                <TransitionLayout>
                    main
                    <Button text='Добавить уведку' handleClick={addNotification}/>
                </TransitionLayout>
        </>
    )
}