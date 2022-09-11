import { createSlice } from "@reduxjs/toolkit";

const initialState={
    visible: true,
    expanded: false,
    host: "sip.minta365.ru",
    port: 7443,
    pathname: "",
    user: "1002",
    password: "2495",
    autoRegister: false,
    autoAnswer: false, // automatically answer incoming calls; false by default
    iceRestart: false, // force ICE session to restart on every WebRTC call; false by default
    sessionTimersExpires: 120, // value for Session-Expires header; 120 by default
    // iceServers: [
    //     { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
    // ],
    debug: false,
    connect_pending: false,
}

export const callControllSlice = createSlice({
    name: 'callControlSlice',
    initialState,
    reducers:{
        setExpanded: (state)=>{
            state.expanded = !state.expanded
        }
    }
})

export const { setExpanded } = callControllSlice.actions

export default callControllSlice.reducer