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