import React from "react";
import {
  MemoryRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./main/webapp/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./../src/main/webapp/css/style.css";
import 'bootstrap/dist/css/bootstrap.css';
import Home from './main/webapp/jsx/components/Home'
import PatientDetail from './main/webapp/jsx/components/Patient/PatientDetail'
import { PatientProvider } from './main/webapp/jsx/context/patient/PatientContext';
import { ScreeningProvider } from './main/webapp/jsx/context/mhpss/ScreeningContext';
import { ConfirmationProvider } from './main/webapp/jsx/context/mhpss/ConfirmationContext';

export default function App() {
  return (
    <PatientProvider>
    <ScreeningProvider>
    <ConfirmationProvider>
        <Router>
          <div>
          <ToastContainer />
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/patient-history">
                <PatientDetail />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
     </Router>
 </ConfirmationProvider>
 </ScreeningProvider>
 </PatientProvider>
  );
}




