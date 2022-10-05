import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'

export default function PreloaderForPage() {
    return (
        <>
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ClipLoader
                    size={100}
                    color={'#197DD2'}
                />
            </div>
        </>
    )
}