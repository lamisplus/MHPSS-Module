import { url as baseUrl, token } from "../../../api";
import axios from "axios";

export const GetConfirmations =(confirmationDispatch, screeningId)=>{
    confirmationDispatch({type: 'SET_CONFIRMATIONS_LOADING', payload: true});
   axios
      .get(`${baseUrl}mhpss-confirmation/screening/${screeningId}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
      )
      .then((response) => {
           confirmationDispatch({type: 'SET_CONFIRMATIONS', payload: response.data});
           confirmationDispatch({type: 'SET_CONFIRMATIONS_LOADING', payload: false});
      })
      .catch((error) => {
        confirmationDispatch({type: 'SET_CONFIRMATIONS_LOADING', payload: false});
      });

 };


 export const createConfirmation = async ({ values }) => {
     try{
         const response = await axios.post(`${baseUrl}mhpss-confirmation`,
          values,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         return null;
     }
         
}

export const getConfirmation = async (id) => {
     try{
         const response = await axios.get(`${baseUrl}mhpss-confirmation/${id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         return null;
     }
         
}


export const updateConfirmation = async ({ values }) => {
     try{
         const response = await axios.put(`${baseUrl}mhpss-confirmation`,
          values,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         return null;
     }
         
}

export const validationConfirmationMeasures = ({values}) => {
     
     if(values.gad7 !== '' || values.auditC !== '' || values.phq9 !== '' || values.dast10 !== '' || values.pcl5 !== ''){
          return true;
     }
     return false;
}


export const deleteConfirmation = async ( id ) => {
     console.log("ID: " + id);
     try{
         const response = await axios.delete(`${baseUrl}mhpss-confirmation/${id}`,
          { headers: {"Authorization" : `Bearer ${token}`} }
         )
         return response;
     }
     catch(error){
         return null;
     }
         
}

