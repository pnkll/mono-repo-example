export const initialState = {
    addContent: {
        editMode: false,
        tempData: [],
    },
    dragDropMode: false,
    filterMode: false,
    isOpen: true,
    limit: 10,
    page: 1,
    totalDocs: null,
    totalPages: null,
    columns: [],
    sort: {}
}

export function reducer(state,action){
    switch (action.type) {
        case 'SET_EDIT_MODE':
            return { ...state, addContent: { ...state.addContent, editMode: !state.addContent.editMode } }
        case 'SET_TEMP_DATA':
            return { ...state, addContent: { ...state.addContent, tempData: action.payload } }
        case 'SET_IS_OPEN':
            return { ...state, isOpen: !state.isOpen }
        case 'SET_DRAG_DROP_MODE':
            return { ...state, dragDropMode: !state.dragDropMode }
        case 'SET_PAGE':
            return {...state, page: action.payload}
        case 'SET_LIMIT':
            return {...state,limit: action.payload}
        case 'SET_TOTAL_DOCS':
            return {...state, totalDocs: action.payload}    
        case 'SET_FILTER_MODE':
            return {...state,filterMode: !state.filterMode}   
        case 'SET_TOTAL_PAGES':
            return {...state, totalPages: action.payload}     
        case 'SET_SORT':
            return {...state, sort: action.payload}    
        case 'SET_COLUMNS':
            return {...state, columns: action.payload}    
    }
}