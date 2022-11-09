import { createContainer } from 'react-tracked'
import io from 'socket.io-client'
import {useState} from 'react'

const useValue = ({token}) =>useState(io('https://restapi.minta365.ru',{
    autoConnect: false,
    extraHeaders: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer 4efa614f5e9c3ec4023c126d0046c869b75449f9f51c50f58d6c1468f4978d65812891816fb2453660bb3c0bea8166261fc83c3ef04f5364e3dac8ddc5c27b3a9b1809ca974a1bd7c30f5b2999cb1c9a5ee6148458bdf3657ba091b9b3440781fdcc966bbf94cf4857f83270eb5b7fa6181ffa759ccd856ca9df227b1db0ae112db28e794c0a78b1851926c12dced3ea778a629a031f2d1965ff16b8d75ac108a9221f767987341f1d5421c334f7d0924a7b62b9e6431209adcc4a70ba48c8ae`
    }
}))

export const {Provider: SocketProvider, useTrackedState: useSocket}= createContainer(useValue)