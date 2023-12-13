import { url as baseUrl, token } from "../../../api";
import axios from "axios";

export const calculateAge = dob => {
      var today = new Date();
      var dateParts = dob.split("-");
      var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      var birthDate = new Date(dateObject); // create a date object directlyfrom`dob1`argument
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age_now--;
              }
          if (age_now === 0) {
                  return m + " month(s)";
              }
              return age_now + " year(s)";
};


export const GetPatientRecentActivities =({dispatch, patientObject})=>{
   axios
      .get(`${baseUrl}mhpss-screening/activities/patients/${patientObject.personUuid}?full=true`,
          { headers: {"Authorization" : `Bearer ${token}`} }
      )
      .then((response) => {
           dispatch({type: 'SET_RECENT_ACTIVITIES', payload: response.data});
      })
      .catch((error) => {
      });

 };
