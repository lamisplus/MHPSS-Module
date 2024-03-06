import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import ScreeningContext from "./../../../context/mhpss/ScreeningContext";
import PatientContext from '../../../context/patient/PatientContext';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { faSave, faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createScreening, updateScreening, wouldRefer } from '../../../context/mhpss/ScreeningAction';
import { toast} from "react-toastify";
import IconButton from '@mui/material/IconButton';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import Select from './../../FormsUI/Select';
import Button from './../../FormsUI/Button';
import DateTimePicker from './../../FormsUI/DateTimePicker';
import { GetPatientRecentActivities } from '../../../context/patient/PatientAction';
import ButtonWrapper from './../../FormsUI/Button';
import TextfieldWrapper from '../../FormsUI/TextField';
import { GetConfirmations } from '../../../context/mhpss/ConfirmationAction';
import ConfirmationContext from '../../../context/mhpss/ConfirmationContext';

function CreateUpdateMHPSS(){

    //Reset context on page refresh
    const defaultScreening ={sleepIssues: '', recentCalmness: '', suicidalThoughts: '', substanceAbuse: '', recentActivityChallenge: '', encounterDate: ''};

    const {screening, dispatch: screeningDispatch} = useContext(ScreeningContext);
    const {dispatch: confirmationDispatch} = useContext(ConfirmationContext);
    const {patientObject, recentActivities, dispatch} = useContext(PatientContext);
    const [initialFormValues, setInitialFormValues] = useState(screening);
    const [loading, setLoading] = useState(false);
    const [toUpdate, setToUpdate] = useState(false);

    useEffect(() => {
        setInitialFormValues(screening);
    }, [screening]);

    const options = {"yes" : "YES", "no" : "NO"};
    const useStyles = makeStyles((theme) => ({
        formWrapper: {
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(8),
        },
        gridGrayBg: {
            backgroundColor: "#eeeeee",
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
      }));
    const classes = useStyles();

    const initialValues = {
        encounterDate: initialFormValues.encounterDate,
        sleepIssues: initialFormValues.sleepIssues,
        recentCalmness: initialFormValues.recentCalmness,
        suicidalThoughts: initialFormValues.suicidalThoughts,
        recentActivityChallenge: initialFormValues.suicidalThoughts,
        substanceAbuse: initialFormValues.substanceAbuse,
        screenedBy: initialFormValues.screenedBy
    }

    return (
        <>
            <Grid container justifyContent="flex-end" alignItems="center">
                <Grid item>
                    <IconButton
                        hidden={screening.action !== 'view'}
                        onClick={
                            () =>{
                                screeningDispatch({type: 'RESET_SCREENING'});
                            }
                        }
                    >
                        <FontAwesomeIcon icon={faPlus} size='1x'
                          style={{
                            color: '#1976D2',
                            '&:hover': {
                              cursor: 'pointer', // Change cursor to hand on hover
                              color: 'green',    // Change color on hover if needed
                            },
                          }}
                          />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container rowSpacing={3}>
                <Container maxWidth="md">
                    <div className={classes.formWrapper}>
                        <Formik
                            enableReinitialize 
                            initialValues = {{...initialValues}}
                            validationSchema = {Yup.object({
                                sleepIssues: Yup.string('Sleep issues must be a string').required('Sleep issues is manadatory'),
                                recentCalmness: Yup.string('Recent calmness must be a string').required('Recent calmness is mandatory'),
                                suicidalThoughts: Yup.string('Suicidal thoughts must be a string').required('Suicidal thoughts is manadatory'),
                                recentActivityChallenge: Yup.string('Recent activity challenge must be a string').required('Recent activity challenge is manadatory'),
                                substanceAbuse: Yup.string('Substance abuse must be a string').required('Substance abuse is mandatory'),
                                encounterDate: Yup.date('Encounter date must be a valid date').required('Encounter date is required'),
                                screenedBy: Yup.string('Screened by must be a string').required('Screened by is mandatory'),
                            })}
                            onSubmit={(values, actions) => {
                                setLoading(true);
                                values.personUuid = patientObject.personUuid;
                                if(screening.action === 'update'){
                                    if(!wouldRefer(values) && screening.referred){
                                        const continueUpdate = window.confirm('Client will no longer be referred. All confirmations linked to this screening will be deleted. Proceed?');
                                        if(!continueUpdate){
                                            setLoading(false);
                                            return;
                                        }
                                    }
                                    
                                    values.id = screening.id;
                                    updateScreening({values}).then(response => {
                                        console.log(values)
                                        if(response !== undefined && response !== null){
                                            if(response.status === 200){
                                                const display = response.data.referred ? 'Record Updated Successfully. Client has been referred for confirmaton' : 'Record updated successfully. Client is not referred for confirmation';
                                                toast.success(display, {position: toast.POSITION.TOP_CENTER});
                                                // GetPatientRecentActivities({dispatch, patientObject});
                                                GetConfirmations(confirmationDispatch, response.data.id);
                                                response.data.action = 'update';
                                                screeningDispatch({type: 'SET_SCREENING', payload: response.data});
                                                setLoading(false);
                                            }
                                            else{
                                                toast.error("Could Not Update Screening!", {position: toast.POSITION.TOP_RIGHT});
                                                setLoading(false);
                                            }
                                            
                                        }else{
                                            toast.error("Error Updating Screening!", {position: toast.POSITION.TOP_RIGHT});
                                            setLoading(false);
                                        }
                                    });

                                }
                                else if(screening.action === 'save' || screening.action === ''){
                                    createScreening({values}).then(response => {                                    
                                        if(response !== undefined && response !== null){
                                            if(response.status === 201){
                                                const display = response.data.referred ? 'Record Saved Successfully. Client has been referred for confirmaton' : 'Record saved successfully. Client is not referred for confirmation';
                                                actions.resetForm();
                                                toast.success(display, {position: toast.POSITION.TOP_CENTER});
                                                GetPatientRecentActivities({dispatch, patientObject});
                                                response.data.action = 'view';
                                                screeningDispatch({type: 'SET_SCREENING', payload: response.data});
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

                                actions.setSubmitting(false);
                            }}
                        >
                            {formik => (
                                <Form>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>

                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <DateTimePicker
                                                        name="encounterDate"
                                                        label="Encounter Date"
                                                        maxDate={new Date()}
                                                        disabled={screening.action === 'view'}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                        
                                                    <TextfieldWrapper
                                                        name="screenedBy"
                                                        label="Screened By"
                                                        disabled={screening.action === 'view'}

                                                    />
                                                
                                                </Grid>
                                            </Grid>

                                            <Grid container  item className={classes.gridGrayBg}>
                                                <Grid item xs={9}>
                                                    <Typography>
                                                        Have you experienced sleep disturbances due to excessive worry or restlessness?
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <Select
                                                    name="sleepIssues"
                                                    label="Sleep Issues"
                                                    options={options}
                                                    disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container item>

                                                <Grid item xs={9}>
                                                    <Typography>
                                                        Have you generally felt calm, relaxed, and able to enjoy your usual daily activities over the past month?
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <Select
                                                    name="recentCalmness"
                                                    label="Recent Calmness"
                                                    options={options}
                                                    disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container item className={classes.gridGrayBg}>
                                                <Grid item xs={9}>
                                                    <Typography>
                                                        Have you had thoughts of self-harm, suicide or hurting others?
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={3}>
                                                <Select
                                                name="suicidalThoughts"
                                                label="Suicidal Thoughts"
                                                options={options}
                                                disabled={screening.action === 'view'}
                                                />
                                                </Grid>
                                            </Grid>

                                            <Grid container item>
                                                <Grid item xs={9}>
                                                    <Typography>
                                                        Have you found it challenging to enjoy your usual daily activities over the past month?
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={3} zeroMinWidth>
                                                    <Select
                                                    name="recentActivityChallenge"
                                                    label="Activity Challenge"
                                                    options={options}
                                                    disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container item className={classes.gridGrayBg}>
                                                <Grid item xs={9} zeroMinWidth>
                                                    <Typography>
                                                    Have you misused alcohol or drugs, including taking more than one drug at a time, or experienced blackouts or flashbacks?
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <Select
                                                    name="substanceAbuse"
                                                    label="Substance Abuse"
                                                    options={options}
                                                    disabled={screening.action === 'view'}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container item hidden={screening.action === 'view'}>
                                                <Grid item xs={2}>
                                                    <ButtonWrapper color='primary' disabled={loading}>
                                                        <FontAwesomeIcon icon={loading ? faSpinner : faSave} size="lg" style={{ marginRight: '0.5rem' }} />
                                                        {screening.action === '' ? 'Save' : 'Update'}
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


    </>
    )
}

export default CreateUpdateMHPSS