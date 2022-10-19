import React from 'react';
import { useReducer } from 'react';
import { TableContext } from './TableContext';
import { tableInitialState, tableReducer } from './TableReducer';

export default function TableProvider({children}){

    const [state,dispatch]=useReducer(tableReducer,tableInitialState)

   return(
       <>
       <TableContext.Provider value={[state,dispatch]}>
        {children}
       </TableContext.Provider>
       </>
   )
}