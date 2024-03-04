const screeningReducer = (state, action) => {
    switch(action.type){

        case 'SET_SCREENING':
            return {
                ...state,
                screening: action.payload,
            }
        case 'RESET_SCREENING':
            return {
                ...state,
                screening: {
                    sleepIssues: '',
                    recentCalmness: '',
                    suicidalThoughts: '',
                    substanceAbuse: '',
                    recentActivityChallenge: '',
                    encounterDate: '',
                    screenedBy: '',
                    action: ''
            },
        };
        default:
            return state
    }
}

export default screeningReducer;