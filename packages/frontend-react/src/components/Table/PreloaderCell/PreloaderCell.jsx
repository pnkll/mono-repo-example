import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'

export default function PreloaderCell({ colSpan }) {
    return (
        <>
            <tr style={{
                //background: 'rgb(167 184 231 / 35%)',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: '-74vh'
            }}>
                <th colSpan={colSpan} style={{ height: '100%', position: 'absolute', width: '100%' }}>
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
                </th>
            </tr>
        </>
    )
}