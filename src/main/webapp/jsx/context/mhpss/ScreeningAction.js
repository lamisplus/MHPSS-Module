import { url as baseUrl, token } from "../../../api";
import axios from "axios";

export const GetScreening =(screeningDispatch, id, action)=>{
   axios
     .get(`${baseUrl}mhpss-screening/${id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
     )
     .then((response) => {
          response.data.action = action;
          screeningDispatch({type: 'SET_SCREENING', payload: response.data});
     })
     .catch((error) => {
          console.log(error);
     });
};


export const createScreening = async ({ values }) => {
     try{
         const response = await axios.post(`${baseUrl}mhpss-screening`,
          values,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         throw error;
     }
         
}

export const updateScreening = async ({ values }) => {
     try{
         const response = await axios.put(`${baseUrl}mhpss-screening`,
          values,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         throw error;
     }
         
}


export const deleteScreening = async ({ id }) => {
     console.log("ID: " + id);
     try{
         const response = await axios.delete(`${baseUrl}mhpss-screening/${id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         return null;
     }
         
}

export const createActivityObject = (mhpssScreening) =>{
     const activity = {
          id: mhpssScreening.id,
          name: "MHPSS Screening",
          date: mhpssScreening.encounterDate,
          icon: "",
          path: "mhpss-screening",
          deletable: true,
          editable: true,
          viewable: true,
          keywords: null

     }
     return activity;
}

export const wouldRefer = (values) => {
     var countYes = 0;
     if (values.suicidalThoughts.toLowerCase() === 'yes') {
         return true;
     }

     if(values.recentCalmness.toLowerCase() === 'no'){
          countYes = countYes + 1;
     }
 
     const fieldsToCheck = [
          values.substanceAbuse,
          values.sleepIssues,
          values.recentActivityChallenge
     ];
 
      countYes = (fieldsToCheck.filter(field => field.toLowerCase() === 'yes').length) + countYes;
 
     return countYes >= 2;
 }
 
 

