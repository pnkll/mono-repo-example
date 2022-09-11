import React, { useRef } from "react";
import PropTypes from "prop-types";
import { SipProvider } from "react-sip";
//components
// import Phone from "../components/Phone";

//Redux
import CallControl from "../CallControl/CallControl.jsx";


export default function CallWrapper() {
    const sip = useRef();
    const initialState={
        visible: true,
        expanded: false,
        host: "sip.minta365.ru",
        port: 7443,
        pathname: "",
        user: "1002",
        password: "2495",
        autoRegister: true,
        autoAnswer: false, // automatically answer incoming calls; false by default
        iceRestart: false, // force ICE session to restart on every WebRTC call; false by default
        sessionTimersExpires: 120, // value for Session-Expires header; 120 by default
        // iceServers: [
        //     { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
        // ],
        debug: false,
        connect_pending: false,
    }

    return (
        <SipProvider
            ref={sip}
            host={initialState.host}
            port={initialState.port}
            pathname={initialState.pathname}
            user={initialState.user}
            password={initialState.password}
            autoRegister={false}
            autoAnswer={initialState.autoAnswer}
            iceRestart={initialState.iceRestart}
            sessionTimersExpires={initialState.sessionTimersExpires}
            // extraHeaders={{ // optional sip headers to send
            //     register: ['X-Foo: foo', 'X-Bar: bar'],
            //     invite: ['X-Foo: foo2', 'X-Bar: bar2']
            // }}
            iceServers={initialState.iceServers}
            debug={initialState.debug}
            connect_pending={false}
        >
            <CallControl props={sip} />
        </SipProvider>
    )
}