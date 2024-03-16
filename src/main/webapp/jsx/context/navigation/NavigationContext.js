import { createContext, useReducer } from "react";
import navigationReducer from "./NavigationReducer";

const NavigationContext = createContext();

export const NavigationProvider = ({children}) => {
    const initialState = {
        activeContent: {}
    }

    const [state, dispatch] = useReducer(navigationReducer, initialState);

    return <NavigationContext.Provider value = {{
        ...state,
        dispatch,
    }}>
        {children}
    </NavigationContext.Provider>
}

export default NavigationContext;