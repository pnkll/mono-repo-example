import { addNotify } from "@store/slices/notificationsSlice"

export async function rtkNotify(id, { dispatch, queryFulfilled }, { success, error }) {
    try {
        const { data } = await queryFulfilled
        dispatch(addNotify({ type: 'success', message: success }))
    } catch ({  }) {
        dispatch(addNotify({ type: 'error', message: error }))
    }
}