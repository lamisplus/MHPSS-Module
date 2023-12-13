import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Link } from 'react-router-dom'
import ButtonMui from "@material-ui/core/Button";
import { TiArrowBack } from 'react-icons/ti'
import Divider from '@material-ui/core/Divider';
import {Label,} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Col, Row } from "reactstrap";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { url as baseUrl, token } from "./../../../api";
import Typography from '@material-ui/core/Typography';
import PatientContext from "./../../context/patient/PatientContext";
import {calculateAge} from "./../../context/patient/PatientAction";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast} from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons';


//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '20.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function PatientCard(props) {
    const { classes } = props;
    const {patientObject, dispatch} = useContext(PatientContext);
    const [isCopied, setIsCopied] = useState(false);

    const copiedNotification = () => {
        toast("Copied!", {position: toast.POSITION.TOP_RIGHT});
        setIsCopied(false);
    }

    return (
        <div className={classes.root}>
           <ExpansionPanel >
                    <ExpansionPanelSummary >
                    <Row>
                        <Col md={12}>
                        {patientObject && patientObject!==null ? (<>
                        <Row className={"mt-1"}>
                        <Col md={12} className={classes.root2}>
                        <b style={{fontSize: "25px", color:'rgb(153, 46, 98)'}}>
                            {patientObject.firstName + " " + patientObject.surname }
                            </b>
                            <Link to={"/"} >
                            <ButtonMui
                                variant="contained"
                                color="primary"
                                className=" float-end ms-2 mr-2 mt-2"
                                //startIcon={<FaUserPlus size="10"/>}
                                startIcon={<TiArrowBack  />}
                                style={{backgroundColor:"rgb(153, 46, 98)", color:'#fff', height:'35px'}}

                            >
                                <span style={{ textTransform: "capitalize" }}>Back</span>
                            </ButtonMui>
                          </Link>
                        </Col>
                        <Col md={4} className={classes.root2}>
                        <span>
                            {" "}
                            Patient ID : <b style={{color:'#0B72AA'}}>{patientObject.hospitalNumber}</b>
                            <CopyToClipboard text={patientObject.hospitalNumber}
                              onCopy={() => setIsCopied(true)}>
                              <span style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faClipboard} size="lg" /></span>
                            </CopyToClipboard>
                            {isCopied && copiedNotification()}
                        </span>
                        </Col>

                        <Col md={4} className={classes.root2}>
                        <span>
                            Date Of Birth : <b style={{color:'#0B72AA'}}>{patientObject.dateOfBirth}</b>
                        </span>
                        </Col>
                        <Col md={4} className={classes.root2}>
                        <span>
                            {" "}
                            Age : <b style={{color:'#0B72AA'}}>{calculateAge(moment(patientObject.dateOfBirth).format("DD-MM-YYYY"))}</b>
                        </span>
                        </Col>
                        <Col md={4}>
                        <span>
                            {" "}
                            Gender :{" "}
                            <b style={{color:'#0B72AA'}}>{patientObject.gender}</b>
                        </span>
                        </Col>
                        <Col md={4} className={classes.root2}>
                        <span>
                            {" "}
                            Phone Number : <b style={{color:'#0B72AA'}}>{patientObject.phone}</b>
                        </span>
                        </Col>
                        <Col md={4} className={classes.root2}>
                        <span>
                            {" "}
                            Address : <b style={{color:'#0B72AA'}}>{patientObject.address} </b>
                        </span>
                        </Col>

                        </Row>
                        </>)
                        :(
                          <>
                          <p>Loading please wait..</p>
                          </>
                        )
                      }
                        </Col>
                    </Row>
                    </ExpansionPanelSummary>
                    <Divider />
            </ExpansionPanel>

        </div>
    );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
