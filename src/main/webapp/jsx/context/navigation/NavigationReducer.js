const navigationReducer = (state, action) => {
    switch(action.type){

        case 'SET_ACTIVE_CONTENT':
            return {
                ...state,
                activeContent: action.payload,
            }
        default:
            return state
    }
}

export default navigationReducer;