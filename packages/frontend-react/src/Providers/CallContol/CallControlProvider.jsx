import React from 'react';
import { SipProvider } from "react-sip";
import { CallControlContext } from './CallControlContext';

export default function CallControlProvider({children}) {
    return (
        <>
        <CallControlContext.Provider>
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
                {/* <CallControl props={sip} /> */}
                {children}
            </SipProvider>
            </CallControlContext.Provider>
        </>
    )
}