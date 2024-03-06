import React, {useState, useContext, useRef, useEffect } from "react";
// BS
import { ButtonGroup, Dropdown,} from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import { url as baseUrl, token } from "../../../../api";
import {  Card,Accordion } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { toast} from "react-toastify";
import {Button, CardContent } from 'semantic-ui-react'
import PatientContext from "../../../context/patient/PatientContext";
import ConfirmationContext from "../../../context/mhpss/ConfirmationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from '@mui/material/IconButton';
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { DialogActions, DialogContentText } from "@mui/material";
import { Formik, Form } from "formik";
import DateTimePicker from './../../FormsUI/DateTimePicker';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import {
    Container,
    Grid,
    Typography
  } from '@material-ui/core';
import MultiSelectWrapper from "../../FormsUI/MultiSelect";
import Select from './../../FormsUI/Select';
import TextfieldWrapper from "../../FormsUI/TextField";
import RadioGroupWrapper from "../../FormsUI/RadioGroup/index.js";
import { makeStyles } from '@material-ui/core/styles';
import ButtonWrapper from "../../FormsUI/Button/index.js";
import { GetConfirmations, createConfirmation, deleteConfirmation, getConfirmation, updateConfirmation, validationConfirmationMeasures } from "../../../context/mhpss/ConfirmationAction.js";
import ScreeningContext from "../../../context/mhpss/ScreeningContext.js";
import {  Modal } from "react-bootstrap";






const ScreeningConfirmations = () => {
    const {open, record, saving, patientObject, dispatch} = useContext(PatientContext);
    const {confirmations, confirmation, action, dispatch: confirmationDispatch} = useContext(ConfirmationContext);
    const {screening, dispatch: screeningDispatch} = useContext(ScreeningContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(confirmation);
    const[loading, setLoading] = useState(false);
    const[confirmationMeasureError, setConfirmationMeasureError] = useState("");
    const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        setInitialFormValues(confirmation);
    }, [confirmation]);
    
      const descriptionElementRef = useRef(null);
      useEffect(() => {
        if (openDialog) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [openDialog]);

      const useStyles = makeStyles((theme) => ({
        formWrapper: {
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(8),
        },
        gridVerticalSpacing: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
      }));
    const classes = useStyles();

    const initialValues = {
        interventionsRendered: initialFormValues.interventionsRendered,
        sessionModality: initialFormValues.sessionModality,
        risksConfirmed: initialFormValues.risksConfirmed,
        currentLevelOfInsight: initialFormValues.currentLevelOfInsight,
        confirmationOutcome: initialFormValues.confirmationOutcome,
        confirmedBy: initialFormValues.confirmedBy,
        gad7: initialFormValues.gad7,
        auditC: initialFormValues.auditC,
        pcl5: initialFormValues.pcl5,
        phq9: initialFormValues.phq9,
        dast10: initialFormValues.dast10,
        diagnosis: initialFormValues.diagnosis,
        diagnosedBy: initialFormValues.diagnosedBy,
        clinicianName: initialFormValues.clinicianName,
        encounterDate: initialFormValues.encounterDate
    }

    const callDeleteConfirmation = () => {
        setLoading(true);
        const confirmationId = confirmation.id;
        deleteConfirmation(confirmationId).then(response => { 
            if(response !== undefined && response !== null){
                if(response.status === 200){
                    toast.success('Confirmation deleted successfully', {position: toast.POSITION.TOP_CENTER});
                    const screeningId = screening.id;
                    console.log(screening);
                    GetConfirmations(confirmationDispatch, screeningId)
                    setToggleDeleteDialog(false);
                    setLoading(false);
                }
                else{
                    toast.error("Could Not Save Screening!", {position: toast.POSITION.TOP_RIGHT});
                    setLoading(false);
                }
                
            }else{
                toast.error("Error Saving Screening!", {position: toast.POSITION.TOP_RIGHT});
                setLoading(false);
            }
        });
    }

    return (
        <>
            <div className="card">
                <div className="card-header  border-0 pb-0" >
                  <h4 className="card-title">Screening Confirmations</h4>
                </div>
                
                <div className="card-body">  
                    <PerfectScrollbar
                        style={{ height: "450px" }}
                        id="DZ_W_Todo1"
                        className="widget-media dz-scroll ps ps--active-y"
                    >
                        {screening.referred && 
                            <IconButton
                                onClick={
                                    () =>{
                                        confirmationDispatch({type: 'SET_ACTION', payload: 'save'});
                                        confirmationDispatch({type: 'RESET_CONFIRMATION'});
                                        setOpenDialog(true);
                                    }
                                }
                            >
                            <FontAwesomeIcon icon={faPlus} size='2x'
                                style={{
                                    color: '#1976D2',
                                    '&:hover': {
                                    cursor: 'pointer', 
                                    color: 'green',   
                                    },
                                }}
                            />
                    </IconButton>
                        }
                        
                        {confirmations.map((confirmation, index) => (
                            <>
                                <Grid container spacing={2}>

                                    <Grid item xs={9}>
                                        <Accordion
                                            className="accordion accordion-header-bg accordion-header-shadow accordion-rounded "
                                            defaultActiveKey="0"
                                            style={{ margin: '4px' }}
                                            onClick={() => {
                                                getConfirmation(confirmation.id).then(response => {                                    
                                                    if(response !== undefined && response !== null){
                                                        if(response.status === 200){
                                                            confirmationDispatch({type: 'SET_CONFIRMATION', payload: response.data});
                                                            confirmationDispatch({type: 'SET_ACTION', payload: 'update'});
                                                            setOpenDialog(true);
                                                        }
                                                        else{
                                                            toast.error("Could not retrieve confirmation!", {position: toast.POSITION.TOP_RIGHT});
                                                        }
                                                        
                                                    }else{
                                                        toast.error("Error retrieving confirmation!", {position: toast.POSITION.TOP_RIGHT});
                                                    }
                                                });

                                            }}
                                        >
                                            <Accordion.Toggle
                                                as={Card.Text}    
                                                className={`accordion-header accordion-header-info`}
                                            >
                                                <span className="accordion-header-icon"></span>
                                                <span className="accordion-header-text"><Typography variant="button" display="block">{confirmation.encounterDate}</Typography> </span>
                                            </Accordion.Toggle>
                                            
                                        </Accordion>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <IconButton
                                            onClick={
                                                () =>{
                                                    confirmationDispatch({type: 'SET_CONFIRMATION', payload: confirmation});
                                                    setToggleDeleteDialog(true);                                                    
                                                }
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrash} size='1x'
                                            style={{
                                                color: 'red',
                                                '&:hover': {
                                                cursor: 'pointer', // Change cursor to hand on hover
                                                color: 'green',    // Change color on hover if needed
                                                },
                                            }}
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </>
                            
                        ))}
                        
                    </PerfectScrollbar>  
                </div>
            </div>


            <Grid container>
            <Grid item>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="md"
            >
                <DialogTitle id="scroll-dialog-title">Screening Confirmation</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        

                    <Grid container rowSpacing={3}>
                        <Container maxWidth="md">
                            <div className={classes.formWrapper}>
                                <Formik
                                    enableReinitialize 
                                    initialValues = {{...initialValues}}
                                    validationSchema = {Yup.object({
                                        interventionsRendered: Yup.array()
                                        .of(Yup.string())
                                        .min(1, 'Select at least one option').required('Interventions rendered is mandatory'),
                                        risksConfirmed: Yup.array()
                                        .of(Yup.string())
                                        .min(1, 'Select at least one option').required('Risks confirmed is mandatory'),
                                        sessionModality: Yup.string('Session modality must be a string').required('Session modality is mandatory'),
                                        currentLevelOfInsight: Yup.string('Curent level of insight must be a string').required('Current level of insight is manadatory'),
                                        confirmationOutcome: Yup.string('Confirmation outcome must be a string').required('Confirmation outcome is mandatory'),
                                        confirmedBy: Yup.string('Confirmed by must be a string').required('Confirmed by is mandatory'),
                                        gad7: Yup.string().oneOf(['mild', 'moderate', 'severe'], 'Select a valid severity'),
                                        auditC: Yup.string().oneOf(['mild', 'moderate', 'severe'], 'Select a valid severity'),
                                        pcl5: Yup.string().oneOf(['mild', 'moderate', 'severe'], 'Select a valid severity'),
                                        phq9: Yup.string().oneOf(['mild', 'moderate', 'severe'], 'Select a valid severity'),
                                        dast10: Yup.string().oneOf(['mild', 'moderate', 'severe'], 'Select a valid severity'),
                                        diagnosis: Yup.string('Diagnosis must be a string').required('Diagnosis is mandatory'),
                                        diagnosedBy: Yup.string('Diagnosed by must be a string').required('Diagnosed by is mandatory'),
                                        clinicianName: Yup.string('Clinician name must be a string').required('Clinician name is mandatory'),
                                        encounterDate: Yup.date('Encounter date must be a valid date').required('Encounter date is required')
                                    })}
                                    onSubmit={(values, actions) => {
                                        values.screeningId = screening.id;
                                        values.id = confirmation.id;
                                        if(!validationConfirmationMeasures({values})){
                                            setConfirmationMeasureError("You must select the severity of one or more confirmation measure");
                                            return;
                                        }
                                        setConfirmationMeasureError("");
                                        if(action === 'save'){
                                            createConfirmation({values}).then(response => {                                    
                                                if(response !== undefined && response !== null){
                                                    if(response.status === 201){
                                                        actions.resetForm();
                                                        setOpenDialog(false);
                                                        GetConfirmations(confirmationDispatch, response.data.screeningId);
                                                        toast.success('Confirmation saved successfully', {position: toast.POSITION.TOP_CENTER});
                                                        setLoading(false);
                                                    }
                                                    else{
                                                        toast.error("Could Not Save Confirmation!", {position: toast.POSITION.TOP_RIGHT});
                                                        setLoading(false);
                                                    }
                                                    
                                                }else{
                                                    toast.error("Error saving confirmation!", {position: toast.POSITION.TOP_RIGHT});
                                                    setLoading(false);
                                                }
                                            });
                                        }else if(action === 'update'){
                                            updateConfirmation({values}).then(response => {
                                                if(response !== undefined && response !== null){
                                                    if(response.status === 200){
                                                        toast.success('Confirmation updated successfully', {position: toast.POSITION.TOP_CENTER});
                                                        setLoading(false);
                                                    }
                                                    else{
                                                        toast.error("Could Not Update Confirmation!", {position: toast.POSITION.TOP_RIGHT});
                                                        setLoading(false);
                                                    }
                                                    
                                                }else{
                                                    toast.error("Error updating confirmation!", {position: toast.POSITION.TOP_RIGHT});
                                                    setLoading(false);
                                                }
                                            })
                                        }
                                       

                                actions.setSubmitting(false);
                            }}
                        >
                            {formik => (
                                <Form>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>

                                            <Grid container spacing={2} className={classes.gridVerticalSpacing}>
                                                <Grid item xs={6}>
                                                    <DateTimePicker
                                                        name="encounterDate"
                                                        label="Encounter Date"
                                                        maxDate={new Date()}
                                                        minDate={new Date(screening.encounterDate)}
                                                        // disabled={screening.action === 'view'}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <MultiSelectWrapper
                                                        name="interventionsRendered"
                                                        label="Interventions Rendered"
                                                        options={interventionsRenderedOptions}
                                                        id="interventionsRendered"
                                                        // disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.gridVerticalSpacing}>
                                                <Grid item xs={6}>
                                                <Select
                                                    name="sessionModality"
                                                    label="Session Modality"
                                                    options={sessionModalityOptions}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <MultiSelectWrapper
                                                        name="risksConfirmed"
                                                        label="Risks Confirmed"
                                                        options={risksConfirmedOptions}
                                                        // disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>


                                            <Grid container spacing={2} className={classes.gridVerticalSpacing}>
                                                <Grid item xs={6}>
                                                <Select
                                                    name="currentLevelOfInsight"
                                                    label="Current Level Of Insight"
                                                    options={currentLevelOfInsight}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Select
                                                        name="confirmationOutcome"
                                                        label="Confirmation Outcome"
                                                        options={confirmationOutcomeOptions}
                                                        // disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>


                                            <Grid container spacing={2} className={classes.gridVerticalSpacing}>
                                                <Grid item xs={6}>
                                                    <Select
                                                        name="confirmedBy"
                                                        label="Confirmed By"
                                                        options={confirmedByOptions}
                                                        // disabled={screening.action === 'view'}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Select
                                                        name="diagnosedBy"
                                                        label="Diagnosed By"
                                                        options={diagnosedByOptions}
                                                        // disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.gridVerticalSpacing}>
                                                <Grid item xs={6}>
                                                    <TextfieldWrapper
                                                        name="clinicianName"
                                                        label="Clinician Name"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container className={classes.gridVerticalSpacing}>
                                                <Grid item xs={12}>
                                                    <TextfieldWrapper
                                                        name="diagnosis"
                                                        label="Diagnosis"
                                                        multiline={true}
                                                        rows={4}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container xs={12} spacing={2}>
                                                <Grid item xs={6}>
                                                    <Card style={{border: '2px solid #014D88' }}>
                                                        <CardContent style={{ margin: '4px'}}>
                                                            <RadioGroupWrapper
                                                                name="gad7"
                                                                label="GAD-7"
                                                                legend="Gad-7"
                                                                options={severityOptions}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Card style={{border: '2px solid #014D88' }}>
                                                        <CardContent style={{ margin: '4px' }}>
                                                            <RadioGroupWrapper
                                                                name="auditC"
                                                                label="AUDIT-C"
                                                                legend="Audit-C"
                                                                options={severityOptions}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                            </Grid>


                                            <Grid container xs={12} spacing={2}>
                                                <Grid item xs={6}>
                                                    <Card style={{border: '2px solid #014D88' }}>
                                                        <CardContent style={{ margin: '4px' }}>
                                                            <RadioGroupWrapper
                                                                name="phq9"
                                                                label="PHQ-9"
                                                                legend="PHQ-9"
                                                                options={severityOptions}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Card style={{border: '2px solid #014D88' }}>
                                                        <CardContent style={{ margin: '4px' }}>
                                                            <RadioGroupWrapper
                                                                name="dast10"
                                                                label="DAST-10"
                                                                legend="DAST-10"
                                                                options={severityOptions}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                            </Grid>

                                            <Grid container xs={12} spacing={2}>
                                                <Grid item xs={6}>
                                                    <Card style={{border: '2px solid #014D88' }}>
                                                        <CardContent style={{ margin: '4px' }}>
                                                            <RadioGroupWrapper
                                                                name="pcl5"
                                                                label="PCL-5"
                                                                legend="PCL-5"
                                                                options={severityOptions}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography color="error">{confirmationMeasureError}</Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container xs={6} spacing={2}>
                                                <Grid item xs={6}>
                                                    <Button type="button" color='grey' onClick={handleClose}>Cancel</Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <ButtonWrapper color='primary' disabled={loading}>
                                                        <FontAwesomeIcon icon={loading ? faSpinner : faSave} size="lg" style={{ marginRight: '0.5rem' }} />
                                                        {action === 'save' ? 'Save' : 'Update'}
                                                    </ButtonWrapper>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
        </Grid>
                    </DialogContentText>
                </DialogContent>
                
            </Dialog>
            </Grid>
            </Grid>

            <Modal show={toggleDeleteDialog} className="fade" size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Confirmation Notification!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you Sure you want to delete?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>callDeleteConfirmation()}  style={{backgroundColor:"red", color:"#fff"}} disabled={loading}>{loading===false ? "Yes": "Deleting..."}</Button>
                    <Button onClick={() => setToggleDeleteDialog(false)} style={{backgroundColor:"#014d88", color:"#fff"}} disabled={loading}>No</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
    
}

const interventionsRenderedOptions = [
    { label: "PFA", value: "PFA" },
    { label: "Pyschoeducation(Insight)", value: "Psychoeducation(Insight)" },
    { label: "Expressive Counseling", value: "Expressive Counseling" },
    { label: "Coping Skills Training", value: "Coping Skills Training" },
    { label: "Motivational Enhancement", value: "Motivational Enhancement" },
    { label: "Abusing Substance", value: "Abusing Substance" }
  ];


  const risksConfirmedOptions = [
    { label: "None", value: "None" },
    { label: "Risk To Self", value: "Risk To Self" },
    { label: "Risk To Others", value: "Risk To Others" },
  ];

const sessionModalityOptions = {
    "In-Person" : "YES",
     "Virtual" : "NO",
     "Peer-to-peer" : "Peer-to-peer",
     "Group/Community" : "Group/Community"
    };

const currentLevelOfInsight = {
    "Good" : "Good",
    "Fair" : "Fair",
    "Lacking" : "Lacking"
};

const confirmationOutcomeOptions = {
    "Mild" : "Mild",
    "Moderate" : "Moderate",
    "Severe" : "Severe"
};

const confirmedByOptions = {
    "Nurse" : "Nurse",
    "Focal Service Provider" : "Focal Service Provider",
    "Psychologist" : "Psychologist"
};

const diagnosedByOptions = {
    "Clinician" : "Nurse",
    "Clinical Psychologist" : "Clinical Psychologist",
    "Psychiatrist" : "Psychiatrist",
    "Psychiatrist Nurse" : "Psychiatrist Nurse",
};

const severityOptions = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
];


export default ScreeningConfirmations;