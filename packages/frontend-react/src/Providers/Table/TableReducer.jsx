export const tableInitialState={
    id: null,
    addContent: {
        editMode: false,
        tempData: [],
    },
}

export function tableReducer(state,action){
    switch (action.type) {
        case 'SET_ID':
            return {...state, id:action.payload}
        case 'SET_EDIT_MODE':
            return {...state, addContent: {...state.addContent, editMode: !state.addContent.editMode}}
        case 'SET_TEMP_DATA':
            return {...state, addContent: {...state.addContent, tempData: action.payload}}
    }
}

export function setEditMode(payload){
    return {type: 'SET_EDIT_MODE', payload}
}
export function setId(payload){
    return {type: 'SET_ID', payload}
}
export function setTempData(payload){
    return {type: 'SET_TEMP_DATA',payload}
}