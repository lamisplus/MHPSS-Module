import React, { useState, useEffect, useContext } from "react";
import { Menu, Popup } from "semantic-ui-react";
import PatientContext from "./../../context/patient/PatientContext";


function SubMenu() {

    const {patientObject, activeContent, dispatch} = useContext(PatientContext);
    useEffect(() => {
        //Observation();
    }, [patientObject]);

    const loadPatientHistory = ()=>{
        dispatch({type: 'SET_ACTIVE_CONTENT', payload: {route:'patient-history'}});
    }
    const onClickHome = (row) =>{
        dispatch({type: 'SET_ACTIVE_CONTENT', payload: {route:"recent-history", id:"", activeTab:"home", actionType:"create", obj:{}}});
    }

    return (
         <div>

             <Menu size="large" color={"black"} inverted >
                 (<>
                     <Menu.Item onClick={() => onClickHome()} >Home</Menu.Item>
//                     <Menu.Item onClick={() => loadPatientHistory()} >History</Menu.Item>
                 </>)
             </Menu>

         </div>
    );
}



export default SubMenu;
