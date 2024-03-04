import { createContext, useReducer } from "react";
import confirmationReducer from "./ConfirmationReducer";

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({children}) => {
    const initialState = {
        confirmations: [],
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
        action: ''
    }

    const [state, dispatch] = useReducer(confirmationReducer, initialState);

    return <ConfirmationContext.Provider value = {{
        ...state,
        dispatch,
    }}>
        {children}
    </ConfirmationContext.Provider>
}

export default ConfirmationContext;