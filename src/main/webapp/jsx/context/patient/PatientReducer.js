const patientReducer = (state, action) => {
    switch(action.type){

        case 'LOAD_PATIENT_OBJECT':
            return {
                ...state,
                patientObject: action.payload,
            }
        case 'SET_ACTIVE_CONTENT':
            return {
                ...state,
                activeContent: action.payload,
            }
        case 'SET_RECENT_ACTIVITIES':
            return {
                ...state,
                recentActivities: action.payload,
            }
        case 'SET_OPEN':
            return {
                ...state,
                open: action.payload,
            }

        case 'SET_RECORD':
            return {
                ...state,
                record: action.payload,
            }
        case 'SET_SAVING':
            return {
                ...state,
                saving: action.payload,
            }

        default:
            return state
    }
}

export default patientReducer;