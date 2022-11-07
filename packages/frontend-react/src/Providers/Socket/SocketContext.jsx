import { createContainer } from 'react-tracked'
import io from 'socket.io-client'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import { selectToken } from '@store/slices/appSlice'
import { isNil } from 'lodash'

const useValue = ({token}) =>useState(io('http://87.103.193.156:3000',{
    autoConnect: false,
    extraHeaders: {
        Authorization: `Bearer ${token}`,
    }
}))

export const {Provider: SocketProvider, useTrackedState: useSocket}= createContainer(useValue)