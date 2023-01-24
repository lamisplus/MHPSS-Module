import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input,InputGroup,
    InputGroupText,} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
// import { Alert } from 'reactstrap';
// import { Spinner } from 'reactstrap';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl, token } from "../../../api";
import { useHistory } from "react-router-dom";
import {  Modal, Button } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";
// import Moment from "moment";
// import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { Spinner } from "reactstrap";

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },
    root: {
        flexGrow: 1,
        "& .card-title":{
            color:'#fff',
            fontWeight:'bold'
        },
        "& .form-control":{
            borderRadius:'0.25rem',
            height:'41px'
        },
        "& .card-header:first-child": {
            borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0"
        },
        "& .dropdown-toggle::after": {
            display: " block !important"
        },
        "& select":{
            "-webkit-appearance": "listbox !important"
        },
        "& p":{
            color:'red'
        },
        "& label":{
            fontSize:'14px',
            color:'#014d88',
            fontWeight:'bold'
        },
    },
    input: {
        display: 'none'
    },
    error: {
        color: "#f85032",
        fontSize: "11px",
      },
      success: {
        color: "#4BB543 ",
        fontSize: "11px",
      }, 
}))

const PrEPCommencementForm = (props) => {

    const patientObj = props.patientObj;
    //console.log(props)
    let history = useHistory();
    const classes = useStyles()
    const [prepRegimen, setprepRegimen] = useState([]);
    const [objValues, setObjValues] = useState({
        dateInitialAdherenceCounseling: "",
        datePrepStart: "",
        height: "",
        personId: patientObj.personId,
        prepClientId: props.prepId,
        regimenId: "",
        urinalysisResult: "",
        prepEligibilityUuid:"",
        weight:"",
        drugAllergies:"",
        reffered:"",
        datereferred:"",
        extra: {},
        nextAppointment: "",
        pregnant: true,
        prepEnrollmentUuid: "",

    });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [pregnant, setpregnant] = useState([]);
    const [patientDto, setPatientDto] = useState();

    useEffect(() => {         
        PREGANACY_STATUS();
        GetPatientDTOObj();
        PrepRegimen();
        if(props.activeContent.id && props.activeContent.id!=="" && props.activeContent.id!==null){
            GetPatientCommercement(props.activeContent.id)
        }
    }, []);
    const PrepRegimen =()=>{
        axios
        .get(`${baseUrl}prep-regimen`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
          setprepRegimen(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
      }
    const GetPatientCommercement =(id)=>{
        axios
           .get(`${baseUrl}prep/commencement/person/${props.patientObj.personId}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
                //console.log(response.data.find((x)=> x.id===id));
               setObjValues(response.data.find((x)=> x.id===id));
           })
           .catch((error) => {
           //console.log(error);
           });          
    }
    const PREGANACY_STATUS =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/PREGANACY_STATUS`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setpregnant(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
    }
    const GetPatientDTOObj =()=>{
        axios
           .get(`${baseUrl}prep/enrollment/open/patients/${props.patientObj.personId}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               setPatientDto(response.data);
           })
           .catch((error) => {
           //console.log(error);
           });          
    }
    // const GetPatientPrepEligibility =(id)=>{
    //     axios
    //        .get(`${baseUrl}prep/enrollment/person/${props.patientObj.personId}`,
    //            { headers: {"Authorization" : `Bearer ${token}`} }
    //        )
    //        .then((response) => {
    //             //console.log(response.data.find((x)=> x.id===id));
    //            //setObjValues(response.data.find((x)=> x.id===id));
    //        })
    //        .catch((error) => {
    //        //console.log(error);
    //        });          
    // } 
            //Vital signs clinical decision support 
    const [vitalClinicalSupport, setVitalClinicalSupport] = useState({
        bodyWeight: "",
        height: "",
    })
    const handleInputChange = e => { 
          
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }    

    const validate = () => {
        let temp = { ...errors }
        temp.dateInitialAdherenceCounseling = objValues.dateInitialAdherenceCounseling ? "" : "This field is required"
        temp.datePrepStart = objValues.datePrepStart ? "" : "This field is required"
        temp.regimenId = objValues.regimenId ? "" : "This field is required"
        temp.height = objValues.height ? "" : "This field is required"
        temp.weight = objValues.weight ? "" : "This field is required"
        temp.reffered = objValues.reffered ? "" : "This field is required"
        temp.datereferred = objValues.datereferred ? "" : "This field is required"
        setErrors({
            ...temp
            })    
        return Object.values(temp).every(x => x == "")
    }
    //to check the input value for clinical decision 
    const handleInputValueCheckHeight =(e)=>{
        if(e.target.name==="height" && (e.target.value < 48.26 || e.target.value>216.408)){
        const message ="Height cannot be greater than 216.408 and less than 48.26"
        setVitalClinicalSupport({...vitalClinicalSupport, height:message})
        }else{
        setVitalClinicalSupport({...vitalClinicalSupport, height:""})
        }
    }
    const handleInputValueCheckBodyWeight =(e)=>{
        if(e.target.name==="bodyWeight" && (e.target.value < 3 || e.target.value>150)){      
        const message ="Body weight must not be greater than 150 and less than 3"
        setVitalClinicalSupport({...vitalClinicalSupport, bodyWeight:message})
        }else{
        setVitalClinicalSupport({...vitalClinicalSupport, bodyWeight:""})
        }
    }
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();
        if(validate()){
           setSaving(true);
           objValues.prepEnrollmentUuid=patientDto.uuid 
          axios.post(`${baseUrl}prep/commencement`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},          
          ).then(response => {
                  setSaving(false);
                  props.patientObj.commenced=true
                  toast.success("Record save successful", {position: toast.POSITION.BOTTOM_CENTER});
                  props.setActiveContent({...props.activeContent, route:'recent-history'})
                 
              })
              .catch(error => {
                  setSaving(false);
                  if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    if(error.response.data.apierror && error.response.data.apierror.message!=="" && error.response.data.apierror && error.response.data.apierror.subErrors[0].message!==""){
                      toast.error(error.response.data.apierror.message + " : " + error.response.data.apierror.subErrors[0].field + " " + error.response.data.apierror.subErrors[0].message, {position: toast.POSITION.BOTTOM_CENTER});
                    }else{
                      toast.error(errorMessage, {position: toast.POSITION.BOTTOM_CENTER});
                    }
                }else{
                    toast.error("Something went wrong, please try again...", {position: toast.POSITION.BOTTOM_CENTER});
                }
              });
            }          
    }
    


  return (      
        <div >      
            <Card className={classes.root}>
                <CardBody>
                <form >
                    <div className="row">
                        <h2> PrEP Commencement </h2>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label for="uniqueId">Date of Initial Adherence Counseling </Label>
                            <Input
                                className="form-control"
                                type="date"
                                name="dateInitialAdherenceCounseling"
                                id="dateInitialAdherenceCounseling"
                                min={patientDto && patientDto.dateEnrolled ?patientDto.dateEnrolled :""}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                value={objValues.dateInitialAdherenceCounseling}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                            />
                            {errors.dateInitialAdherenceCounseling !=="" ? (
                                <span className={classes.error}>{errors.dateInitialAdherenceCounseling}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                            <Label >Date PrEP started *</Label>
                            <Input
                                className="form-control"
                                type="date"
                                name="datePrepStart"
                                id="datePrepStart"
                                min={patientDto && patientDto.dateEnrolled ?patientDto.dateEnrolled :""}
                                max= {moment(new Date()).format("YYYY-MM-DD") }
                                value={objValues.dateOfRegistration}
                                onChange={handleInputChange}
                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                            />
                             {errors.datePrepStart !=="" ? (
                                <span className={classes.error}>{errors.datePrepStart}</span>
                            ) : "" }   
                            </FormGroup>
                        </div>
                        
                    </div>
                    
                    <div className="row">
                        <div className=" mb-3 col-md-4">
                            <FormGroup>
                            <Label >Body Weight</Label>
                            <InputGroup> 
                                <Input 
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    onChange={handleInputChange}
                                    min="3"
                                    max="150"
                                    value={objValues.weight}
                                    onKeyUp={handleInputValueCheckBodyWeight} 
                                    style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                />
                                <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                    kg
                                </InputGroupText>
                            </InputGroup>
                            {vitalClinicalSupport.bodyWeight !=="" ? (
                                    <span className={classes.error}>{vitalClinicalSupport.bodyWeight}</span>
                            ) : ""}
                            {errors.weight !=="" ? (
                                <span className={classes.error}>{errors.weight}</span>
                            ) : "" }
                            </FormGroup>
                        </div>                                   
                        <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                            <Label >Height</Label>
                            <InputGroup> 
                            <InputGroupText
                                    addonType="append"
                                    style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}
                                    >
                                    cm
                            </InputGroupText>
                                <Input 
                                    type="number"
                                    name="height"
                                    id="height"
                                    onChange={handleInputChange}
                                    value={objValues.height}
                                    min="48.26"
                                    max="216.408"
                                    onKeyUp={handleInputValueCheckHeight} 
                                    style={{border: "1px solid #014D88", borderRadius:"0rem"}}
                                />
                                    <InputGroupText
                                    addonType="append"
                                    
                                    style={{ backgroundColor:"#992E62", color:"#fff", border: "1px solid #992E62", borderRadius:"0rem"}}
                                    >
                                    {objValues.height!=='' ? (objValues.height/100).toFixed(2) + "m" : "m"}
                                </InputGroupText>
                            </InputGroup>
                            {vitalClinicalSupport.height !=="" ? (
                                <span className={classes.error}>{vitalClinicalSupport.height}</span>
                            ) : ""}
                            {errors.height !=="" ? (
                                <span className={classes.error}>{errors.height}</span>
                            ) : "" }
                            </FormGroup>
                        </div>
                        <div className="form-group mb-3 mt-2 col-md-4">
                            {objValues.weight!=="" && objValues.height!==''&&(
                                <FormGroup>
                                <Label > {" "}</Label>
                                <InputGroup> 
                                <InputGroupText addonType="append" style={{ backgroundColor:"#014D88", color:"#fff", border: "1px solid #014D88", borderRadius:"0rem"}}>
                                    BMI :  {(objValues.weight/((objValues.height/100) * (objValues.height/100))).toFixed(2)}
                                </InputGroupText>                   
                            
                                </InputGroup>                
                                </FormGroup>
                            )}
                        </div>
                        {props.patientObj.personResponseDto.sex==='Female'  || props.patientObj.personResponseDto.sex==='female' || props.patientObj.personResponseDto.sex==='FEMALE' && (       
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Pregnancy Status</Label>
                        <Input
                            type="select"
                            name="pregnant"
                            id="pregnant"
                            onChange={handleInputChange}
                            value={objValues.pregnant}  
                        >
                        <option value="1"> </option>
                        {pregnant.map((value) => (
                            <option key={value.id} value={value.code}>
                                {value.display}
                            </option>
                        ))}
                        
                        </Input>
                        </FormGroup>
                        
                        </div>
                        )}
                        {objValues.pregnant==='PREGANACY_STATUS_BREASTFEEDING' && (
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Breast Feeding</Label>
                        <Input
                            type="select"
                            name="breastFeeding"
                            id="breastFeeding"
                            onChange={handleInputChange}
                            value={objValues.breastFeeding}
                            
                        >
                        <option value="">Select </option>
                        <option value="Yes"> Yes</option>
                        <option value="No"> No</option>
                        </Input>
                        
                        </FormGroup>
                        
                        </div>
                        )}
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">History of drug Allergies</Label>
                        <Input
                            type="textarea"
                            name="drugAllergies"
                            id="drugAllergies"
                            onChange={handleInputChange}
                            value={objValues.drugAllergies}
                            
                        />
                      
                        </FormGroup>
                        
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Urinalysis Result</Label>
                        <Input
                            type="text"
                            name="urinalysisResult"
                            id="urinalysisResult"
                            onChange={handleInputChange}
                            value={objValues.urinalysisResult}
                            
                        />
                        </FormGroup>
                        
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Referred</Label>
                        <Input
                            type="select"
                            name="reffered"
                            id="reffered"
                            onChange={handleInputChange}
                            value={objValues.reffered}
                            
                        >
                        <option value=""> </option>
                        <option value="Yes"> Yes</option>
                        <option value="No"> No</option>
                        </Input>
                        {errors.reffered !=="" ? (
                                <span className={classes.error}>{errors.reffered}</span>
                            ) : "" } 
                        </FormGroup>
                        
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">Date referred</Label>
                        <Input
                            type="date"
                            name="datereferred"
                            id="datereferred"
                            onChange={handleInputChange}
                            value={objValues.datereferred}
                            min={patientDto && patientDto.dateEnrolled ?patientDto.dateEnrolled :""}
                            max= {moment(new Date()).format("YYYY-MM-DD") }
                        />
                        {errors.datereferred !=="" ? (
                                <span className={classes.error}>{errors.datereferred}</span>
                            ) : "" } 
                        </FormGroup>
                        
                        </div>
                        <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="">PrEP Regimen</Label>
                        <Input
                            type="select"
                            name="regimenId"
                            id="regimenId"
                            onChange={handleInputChange}
                            value={objValues.regimenId}
                            
                        >
                        <option value=""> Select</option>
                        {prepRegimen.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.composition}
                                </option>
                                ))}
            
                        </Input>
                        {errors.regimenId !=="" ? (
                                <span className={classes.error}>{errors.regimenId}</span>
                            ) : "" } 
                        </FormGroup>
                        
                        </div>
                    </div>
                    
                    {saving ? <Spinner /> : ""}
                    <br />
                
                    <MatButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                        >
                        {!saving ? (
                        <span style={{ textTransform: "capitalize" }}>Save</span>
                        ) : (
                        <span style={{ textTransform: "capitalize" }}>Saving...</span>
                        )}
                    </MatButton>
                
                <MatButton
                    variant="contained"
                    className={classes.button}
                    startIcon={<CancelIcon />}
                    onClick={props.toggle}
                    
                >
                    <span style={{ textTransform: "capitalize" }}>Cancel</span>
                </MatButton>
                
                    </form>
                </CardBody>
            </Card>                    
        </div>
  );
}

export default PrEPCommencementForm;
