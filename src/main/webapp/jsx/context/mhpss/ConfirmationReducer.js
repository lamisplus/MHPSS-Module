const confirmationReducer = (state, action) => {
    switch(action.type){

        case 'LOAD_CONFIRMATIONS':
            return {
                ...state,
                confirmations: action.payload,
            }
        case 'LOAD_CONFIRMATION':
            return {
                ...state,
                confirmation: action.payload,
            }

        default:
            return state
    }
}
export default confirmationReducer;