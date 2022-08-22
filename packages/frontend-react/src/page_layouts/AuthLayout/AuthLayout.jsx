import React from 'react';
import './AuthLayout.scss'

export default React.memo(function AuthLayout({ children }) {
    return (
        <>
            <div className="auth__container">
                <div className="auth__left-side"></div>
                <div className="auth__right-side">
                    <div className="auth__content">{children}</div>
                </div>
            </div>
        </>
    )
})