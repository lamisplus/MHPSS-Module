import { createContext, useReducer } from "react";
import screeningReducer from "./ScreeningReducer";

const ScreeningContext = createContext();

export const ScreeningProvider = ({children}) => {
    const initialState = {
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
    }

    const [state, dispatch] = useReducer(screeningReducer, initialState);

    return <ScreeningContext.Provider value = {{
        ...state,
        dispatch,
    }}>
        {children}
    </ScreeningContext.Provider>
}

export default ScreeningContext;