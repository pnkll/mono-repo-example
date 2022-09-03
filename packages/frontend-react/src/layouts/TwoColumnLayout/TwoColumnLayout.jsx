import React from 'react';

export default React.memo(function TwoColumnLayout({ children }) {
    return (
        <>
            <div className="two-column-layout" style={{display: 'flex', flexWrap: 'wrap', width: '100%', gap: '20px'}}>
                {children}
            </div>
        </>
    )
})