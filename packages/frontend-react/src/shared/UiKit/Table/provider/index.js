import { useReducer } from "react";
import { createContainer } from "react-tracked";
import { initialState, reducer } from "./reducer";
import { setPage,setTempData,setIsOpen,setDragDropMode,setLimit,setTotalDocs,setFilterMode,setTotalPages,setSort,setColumns } from "@src/shared/UiKit/Table/provider/actions";

const useValue = ()=> useReducer(reducer,initialState)

export const {Provider: TableProvider, useTracked: useTrackedTable}=createContainer(useValue)

export {setPage,setTempData,setIsOpen,setDragDropMode,setLimit,setTotalDocs,setFilterMode,setTotalPages,setSort,setColumns}