export default function registerReducer (state = null,action) {
    switch (action.type) {
        case 'register':
            return action.data
        default:
            return state
    }
}