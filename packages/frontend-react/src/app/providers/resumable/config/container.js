import { getReducer, reducer } from "./reducer"
import { useReducer } from "react"
import { createContainer } from "react-tracked"

const useValue = () => getReducer()

export const {Provider:ResumableProvider,useUpdate:useUpdateResumable, useTrackedState: useTrackedResumableState, useTracked:useTrackedResumable}=createContainer(useValue)