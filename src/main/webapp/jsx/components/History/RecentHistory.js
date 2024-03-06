import React, { Fragment, useEffect, useContext } from "react";
// BS
/// Scroll
//import { Link } from "react-router-dom";
//import { Alert } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import PatientContext from "./../../context/patient/PatientContext";
import CreateUpdateMHPSS from "./../Mhpss/pages/CreateUpdateMHPSS";
import RecentActivities from "./../RecentActivities";
import {GetPatientRecentActivities} from "./../../context/patient/PatientAction";
import ScreeningConfirmations from "../Mhpss/pages/ScreeningConfirmations";
import Spinner from "../Spinner";
import ConfirmationContext from "../../context/mhpss/ConfirmationContext";

const RecentHistory = () => {
  console.log('called');
  const {patientObject, activeContent, recentActivitiesLoading, dispatch} = useContext(PatientContext);
  const{confirmationsLoading} = useContext(ConfirmationContext);
  
  useEffect(() => {
    const fetchData = async () => {
      GetPatientRecentActivities({ dispatch, patientObject });
      console.log(patientObject.personUuid);
    };
  
    fetchData();
  }, [patientObject]);
  

  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">
        <div className="col-xl-3 col-xxl-3 col-lg-3">
            {recentActivitiesLoading ? (
                <Spinner />
              )
              :
              (<RecentActivities />)
            }
            
        </div>
        <div className="col-xl-6 col-xxl-6 col-lg-6">
            <div className="card">
                <div className="card-header border-0  pb-2" style={{backgroundColor:"#EEEEEE"}}>
                    <h4 className="card-title">Screening</h4>
                </div>
                <div className="row">
                    <CreateUpdateMHPSS />
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-3">
          {confirmationsLoading ? (
                <Spinner />
              )
              :
            (<ScreeningConfirmations />)
          }
        </div>
      </div>
    <div className="col-xl-2 col-xxl-2 col-lg-2"></div>
  </Fragment>
);
};

export default RecentHistory;
