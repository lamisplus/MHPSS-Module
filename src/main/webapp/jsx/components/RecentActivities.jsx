import React, { useState, useEffect, useContext } from "react";
// BS
import { Dropdown,} from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import { url as baseUrl, token } from "../../api";
import {  Card,Accordion } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { toast} from "react-toastify";
import Typography from '@material-ui/core/Typography';
import {  Modal } from "react-bootstrap";
import {Button } from 'semantic-ui-react'
import PatientContext from "./../context/patient/PatientContext";
import ScreeningContext from "./../context/mhpss/ScreeningContext";
import ConfirmationContext from "./../context/mhpss/ConfirmationContext";
import {GetPatientRecentActivities} from "./../context/patient/PatientAction";
import {GetScreening, deleteScreening} from "./../context/mhpss/ScreeningAction";
import {GetConfirmations} from "./../context/mhpss/ConfirmationAction";



const RecentActivities = () => {
    const [activeAccordionHeaderShadow,setActiveAccordionHeaderShadow] = useState(0);
    const {recentActivities, activeContent, open, record, saving, patientObject, dispatch} = useContext(PatientContext);
    const {screening, dispatch: screeningDispatch} = useContext(ScreeningContext);
    const {dispatch: confirmationDispatch} = useContext(ConfirmationContext);
    const toggle = () => dispatch({type: 'SET_OPEN', payload: !open});

    const ActivityName =(name)=> {
        if(name==='MHPSS Screening'){
          return "MH"
        }else {
          return "N/A"
        }
    }

    const LoadViewPage = (row,action) => {
        //populate form
        GetScreening(screeningDispatch, row.id, action);
        GetConfirmations(confirmationDispatch, row.id);

    }

    const LoadModal =(row)=>{
        toggle()
        dispatch({type: 'SET_RECORD', payload: row});
    }

    const LoadDeletePage =(row)=>{
        if(record.path==='mhpss-screening'){
            dispatch({type: 'SET_SAVING', payload: true});
            //props.setActiveContent({...props.activeContent, route:'mental-health-view', id:row.id})
            const id = record.id;
            deleteScreening({id}).then(response => {      
                if(response !== undefined && response !== null){
                    if(response.status === 200){
                        toast.success('Record deleted successfully', {position: toast.POSITION.TOP_RIGHT});
                        GetPatientRecentActivities({dispatch, patientObject})
                        dispatch({type: 'SET_SAVING', payload: false});
                        toggle();
                    }
                    else{
                        toast.error("Could delete screening!", {position: toast.POSITION.TOP_RIGHT});
                        dispatch({type: 'SET_SAVING', payload: false});
                        toggle()
                    }
                    
                }else{
                    toast.error("Error deleting screening", {position: toast.POSITION.TOP_RIGHT});
                    dispatch({type: 'SET_SAVING', payload: false});
                    toggle()
                }
            });
        }        
          
    
    }

    return (
        <>
            <div className="card">
                <div className="card-header  border-0 pb-0" >
                  <h4 className="card-title">Patient Screening</h4>
                </div>
                <div className="card-body">
                    <PerfectScrollbar
                        style={{ height: "450px" }}
                        id="DZ_W_Todo1"
                        className="widget-media dz-scroll ps ps--active-y"
                    >
                        <Accordion
                            className="accordion accordion-header-bg accordion-header-shadow accordion-rounded "
                            defaultActiveKey="0"
                        >

                            {recentActivities.map((data, i)=>
                                <div className="accordion-item" key={i}>
                                    <Accordion.Toggle
                                      as={Card.Text}
                                      eventKey={`${i}`}
                                      className={`accordion-header ${
                                        activeAccordionHeaderShadow === 1 ? "" : "collapsed"
                                      } accordion-header-info`}
                                      onClick={() =>
                                        setActiveAccordionHeaderShadow(
                                          activeAccordionHeaderShadow === 1 ? -1 : i
                                        )
                                      }
                                    >
                                      <span className="accordion-header-icon"></span>
                                      <span className="accordion-header-text"><Typography variant="button">Encounter Date : <span className="">{data.date}</span></Typography> </span>
                                      <span className="accordion-header-indicator"></span>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse
                                        eventKey={`${i}`}
                                        className="accordion__body"
                                    >
                                        <div className="accordion-body-text">
                                            <ul className="timeline">
                                                {data.activities && data.activities.map((activity,index) => (
                                                    <>
                                                        <li>
                                                            <div className="timeline-panel">
                                                                <div className={i % 2 == 0 ? "media me-2 media-info" : "media me-2 media-success"}>{ActivityName(data.name)}</div>
                                                                <div className="media-body">
                                                                    <h5 className="mb-1">{activity.name}</h5>
                                                                    <small className="d-block">
                                                                        {activity.date}
                                                                    </small>
                                                                </div>
                                                                <Dropdown className="dropdown">
                                                                    <Dropdown.Toggle
                                                                        variant=" light"
                                                                        className="i-false p-0 btn-info sharp"
                                                                >
                                                                    <svg
                                                                        width="18px"
                                                                        height="18px"
                                                                        viewBox="0 0 24 24"
                                                                        version="1.1"
                                                                    >
                                                                        <g
                                                                            stroke="none"
                                                                            strokeWidth="1"
                                                                            fill="none"
                                                                            fillRule="evenodd"
                                                                        >
                                                                            <rect x="0" y="0" width="24" height="24" />
                                                                            <circle fill="#000000" cx="5" cy="12" r="2" />
                                                                            <circle fill="#000000" cx="12" cy="12" r="2" />
                                                                            <circle fill="#000000" cx="19" cy="12" r="2" />
                                                                       </g>
                                                                    </svg>
                                                                </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="dropdown-menu">
                                                                        <Dropdown.Item
                                                                            className="dropdown-item"
                                                                            onClick={()=>LoadViewPage(activity, 'view')}
                                                                        >
                                                                            View
                                                                        </Dropdown.Item>

                                                                        <Dropdown.Item
                                                                            className="dropdown-item"
                                                                            onClick={()=>LoadViewPage(activity,'update')}
                                                                        >
                                                                            Update
                                                                        </Dropdown.Item>

                                                                        <Dropdown.Item
                                                                            className="dropdown-item"
                                                                            to="/widget-basic"
                                                                            onClick={()=>LoadModal(activity)}
                                                                        >
                                                                            Delete
                                                                        </Dropdown.Item>

                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </li>
                                                    </>
                                                ))}
                                            </ul>
                                        </div>
                                    </Accordion.Collapse>
                                </div>
                            )}
                        </Accordion>

                    </PerfectScrollbar>
                </div>
            </div>

            <Modal show={open} toggle={toggle} className="fade" size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Notification!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you Sure you want to delete <b>{record && record.name}</b></h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>LoadDeletePage()}  style={{backgroundColor:"red", color:"#fff"}} disabled={saving}>{saving===false ? "Yes": "Deleting..."}</Button>
                    <Button onClick={toggle} style={{backgroundColor:"#014d88", color:"#fff"}} disabled={saving}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RecentActivities;