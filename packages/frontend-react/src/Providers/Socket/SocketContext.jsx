import { createContainer } from 'react-tracked'
import io from 'socket.io-client'
import {useState} from 'react'

const useValue = () =>useState(io('http://localhost:3030',{autoConnect: false}))

export const {Provider: SocketProvider, useTrackedState: useSocket}= createContainer(useValue)