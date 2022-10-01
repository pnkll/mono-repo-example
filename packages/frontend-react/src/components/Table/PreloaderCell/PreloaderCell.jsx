import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'

export default function PreloaderCell({ colSpan }) {
    return (
        <>
            <tr style={{
                background: 'rgb(167 184 231 / 35%)',
                position: 'absolute',
                top: '84px',
                right: 0,
                left: 0,
                bottom: 0
            }}>
                <td colSpan={colSpan} style={{ height: '100%', position: 'absolute', width: '100%' }}>
                    <div className="" style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}>
                        <ClipLoader
                            width={30}
                            color={'#197DD2'}
                        /></div>
                </td>
            </tr>
        </>
    )
}