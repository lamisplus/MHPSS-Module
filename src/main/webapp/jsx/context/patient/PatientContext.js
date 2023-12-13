import { createContext, useReducer } from "react";
import patientReducer from "./PatientReducer";

const PatientContext = createContext();

export const PatientProvider = ({children}) => {
    const initialState = {
        patientObject: {},
        activeContent: {},
        recentActivities: [],
        record: null,
        saving: false,
        open: false
    }

    const [state, dispatch] = useReducer(patientReducer, initialState);

    return <PatientContext.Provider value = {{
        ...state,
        dispatch,
    }}>
        {children}
    </PatientContext.Provider>
}

export default PatientContext;