import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import Reset from "./components/404_Page/Reset";
import PatientDetails from "./components/PatientDetails/PatientDetails";
import Notice from "./components/Notice/Notice";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    let timeout: any
    
    if (message) {

      timeout = setTimeout(() => {
      setMessage('')
    }, 3000)

    }

    () => clearTimeout(timeout)

  }, [message])
  
  return (
          <Router>
    <div className="App">
        <Container>
          <Notice message={message} />
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientDetails setMessage={setMessage} />} />
            <Route path="*" element={<Reset />} />
          </Routes>
        </Container>
    </div>
          </Router>
  );
};

export default App;
