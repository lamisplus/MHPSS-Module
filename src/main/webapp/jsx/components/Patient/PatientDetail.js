import React,{useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PatientCardDetail from './PatientCard'
import { useHistory } from "react-router-dom";
import SubMenu from './SubMenu';
import RecentHistory from './../History/RecentHistory';
import PatientHistory from './../History/PatientHistory'
import axios from "axios";
import { url as baseUrl, token } from "./../../../api";
import PatientContext from "./../../context/patient/PatientContext";

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
    let history = useHistory();
    const {patientObject, activeContent, dispatch} = useContext(PatientContext);
    const { classes } = props;

    useEffect(() => {
        dispatch({type: 'LOAD_PATIENT_OBJECT', payload: history.location && history.location.state ? history.location.state.patientObj : {}});
        dispatch({type: 'SET_ACTIVE_CONTENT', payload: {route:"recent-history", id:"", activeTab:"home", actionType:"create", obj:{}}});
    }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className="row page-titles mx-0" style={{marginTop:"0px", marginBottom:"-10px"}}>
			<ol className="breadcrumb">
				<li className="breadcrumb-item active"><h4> <Link to={"/"} >MHPSS /</Link> Patient Dashboard</h4></li>
			</ol>
		  </div>
      <Card >
        <CardContent>
            <PatientCardDetail />
            <SubMenu />
            <br/>

          {activeContent.route==='patient-history' &&( <PatientHistory />)}
          {activeContent.route==='recent-history' &&(<RecentHistory />)}

          {/* History Pages */}

         </CardContent>
      </Card>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
