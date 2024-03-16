const confirmationReducer = (state, action) => {
    switch(action.type){

        case 'SET_CONFIRMATIONS':
            return {
                ...state,
                confirmations: action.payload,
            }
        case 'SET_CONFIRMATION':
            return {
                ...state,
                confirmation: action.payload,
            }

        case 'SET_ACTION':
            return {
                ...state,
                action: action.payload,
            }

        case 'RESET_CONFIRMATIONS':
            return {
                ...state,
                confirmations: [],
            }

        case 'RESET_CONFIRMATION':
            return {
                ...state,
                confirmation: {
                    interventionsRendered: '',
                    sessionModality: '',
                    risksConfirmed: '',
                    currentLevelOfInsight: '',
                    confirmationOutcome: '',
                    confirmedBy: '',
                    gad7: '',
                    auditC: '',
                    pcl5: '',
                    phq9: '',
                    dast10: '',
                    diagnosis: '',
                    diagnosedBy: '',
                    clinicianName: '',
                    encounterDate: ''
                },
            }

        case 'SET_CONFIRMATIONS_LOADING':
            return {
                ...state,
                confirmationsLoading: action.payload,
            }

        default:
            return state
    }
}
export default confirmationReducer;