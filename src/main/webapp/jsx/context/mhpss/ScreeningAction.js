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
         return null;
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
         return null;
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
     if (values.suicidalThoughts.toLowerCase() === 'yes') {
         return true;
     }
 
     const fieldsToCheck = [
          values.substanceAbuse,
          values.recentCalmness,
          values.sleepIssues,
          values.recentActivityChallenge
     ];
 
     const countYes = fieldsToCheck.filter(field => field.toLowerCase() === 'yes').length;
 
     return countYes >= 2;
 }
 
 

