export const tableInitialState = {
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

export function tableReducer(state, action) {
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

export function setEditMode(payload) {
    return { type: 'SET_EDIT_MODE', payload }
}
export function setTempData(payload) {
    return { type: 'SET_TEMP_DATA', payload }
}
export function setIsOpen(payload) {
    return { type: 'SET_IS_OPEN', payload }
}
export function setDragDropMode(payload) {
    return { type: 'SET_DRAG_DROP_MODE', payload }
}
export function setPage(payload){
    return {type: 'SET_PAGE',payload}
}
export function setLimit(payload){
    return {type: 'SET_LIMIT',payload}
}
export function setTotalDocs(payload){
    return {type: 'SET_TOTAL_DOCS',payload}
}
export function setFilterMode(payload){
    return {type: 'SET_FILTER_MODE',payload}
}
export function setTotalPages(payload){
    return {type: 'SET_TOTAL_PAGES', payload}
}
export function setSort(payload){
    return {type: 'SET_SORT',payload}
}
export function setColumns(payload){
    return {type: 'SET_COLUMNS', payload}
}