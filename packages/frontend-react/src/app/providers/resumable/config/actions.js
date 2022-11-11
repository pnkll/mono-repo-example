export function initResumable(payload){
    return {type: 'INIT_RESUMABLE', payload}
}
export function setShowModal(payload){
    return {type: 'SET_SHOW_MODAL', payload}
}
export function setMeta(payload){
    return {type: 'SET_META',payload}
}
export function addResumableNotify(payload){
    return {type: 'ADD_NOTIFY', payload}
}
export function removeResumableNotify(payload){
    return {type: 'REMOVE_NOTIFY', payload}
}
export function updateProgress(payload){
    return {type: 'UPDATE_PROGRESS', payload}
}
export function setResumableStatus(payload){
    return {type: 'SET_STATUS', payload}
}
export function updateNotify(payload){
    return {type: 'UPDATE_NOTIFY', payload}
}
export function setIdTarget(payload){
    console.log(payload)
    return {type: 'SET_ID_TARGET',payload}
}