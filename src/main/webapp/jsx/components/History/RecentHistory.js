import React, { Fragment, useState, useEffect, useContext } from "react";
// BS
import { Dropdown,} from "react-bootstrap";
/// Scroll
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from "react-perfect-scrollbar";
//import { Link } from "react-router-dom";
import axios from "axios";
import { url as baseUrl, token } from "../../../api";
//import { Alert } from "react-bootstrap";
import {  Card,Accordion } from "react-bootstrap";
import {  Modal } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { toast} from "react-toastify";
import {Button } from 'semantic-ui-react'
import PatientContext from "./../../context/patient/PatientContext";
import CreateUpdateMHPSS from "./../Mhpss/pages/CreateUpdateMHPSS";
import RecentActivities from "./../RecentActivities";
import {GetPatientRecentActivities} from "./../../context/patient/PatientAction";

const RecentHistory = () => {
  const {patientObject, activeContent, dispatch} = useContext(PatientContext);
  useEffect(() => {
    GetPatientRecentActivities({dispatch, patientObject});
  }, [patientObject.personUuid]);



  return (
    <Fragment>
      {/* <Ext /> */}
     
      <div className="row">
        <div className="col-xl-3 col-xxl-3 col-lg-3">
            <RecentActivities />
        </div>
        <div className="col-xl-7 col-xxl-7 col-lg-7">
            <div className="card">
                <div className="card-header border-0  pb-2" style={{backgroundColor:"#EEEEEE"}}>
                    <h4 className="card-title">Screening</h4>
                </div>
                <div className="row">
                    <CreateUpdateMHPSS />
                </div>
            </div>
        </div>
        <div className="col-xl-2 col-xxl-2 col-lg-2">
            <RecentActivities />
        </div>
      </div>
    <div className="col-xl-2 col-xxl-2 col-lg-2"></div>
  </Fragment>
);
};

export default RecentHistory;
