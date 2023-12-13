import { createContext, useReducer } from "react";
import confirmationReducer from "./ConfirmationReducer";

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({children}) => {
    const initialState = {
        confirmations: [],
        confirmation: {},
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