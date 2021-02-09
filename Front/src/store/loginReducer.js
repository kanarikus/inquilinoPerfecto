export default function loginReducer (state = null,action) {
    switch (action.type) {
        case 'login':
            return action.data
        case 'logout':
            return null
        default:
            return state
    }
}