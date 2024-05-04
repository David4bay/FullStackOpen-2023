import { useParams } from "react-router-dom"
import patientService from '../../services/patients'
import { SyntheticEvent, useState, useEffect } from "react"

import {  
    TextField, 
    InputLabel, 
    Input,
    MenuItem, 
    Select, 
    Grid, 
    Button, 
} from "@mui/material"

import { Diagnoses, Entry, Props, OnChange, AddDiagnosis } from "../../types"

import { buttonStyle, childContainer, curvedBorderStyle, dateStyle, dischargeChildComponentStyle, dischargeParentComponentStyle, flexContainer, floatLeftButton, floatRightButton, fullWidth, halfWidth, inputStyle, parentContainer, quarterWidth, setMargin, sickLeaveStyle } from "../../styles/componentStyles"

import { controlInput } from "../../utils/utils"

import { Dispatch, SetStateAction } from "react";

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

function AddEntryForm({ onSubmit, onCancel }: Props) {
    
    const [date, setDate]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [specialist, setSpecialist]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [type, setType]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [description, setDescription]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [employerName, setEmployerName]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [healthCheckRating, setHealthCheckRating]: [number, Dispatch<SetStateAction<number>>] = useState(1);
    const [diagnosisCodes, setDiagnosisCodes]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([]);
    const [selectedDiagnosisValues, setSelectedDiagnosisValues]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([]);
    const [selectedDiagnosis, setSelectedDiagnosis]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [discharge, setDischarge]: [Discharge, Dispatch<SetStateAction<Discharge>>] = useState({
        date: "",
        criteria: ""
    });
    const [sickLeave, setSickLeave]: [SickLeave, Dispatch<SetStateAction<SickLeave>>] = useState({
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        patientService.getDiagnoses().then((data: Omit<Diagnoses, "latin" | "name">) => {
            return setDiagnosisCodes(data?.map(({ code }) => code))
        })
    }, [])

    const paramsId = useParams().id

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault()

        const id = paramsId?.toString()!

        const values: Entry = {
            date,
            specialist,
            type,
            description,
            employerName,
            healthCheckRating,
            diagnosisCodes: selectedDiagnosisValues,
            discharge,
            sickLeave
        }

        onSubmit(id, values)
    }

    const onChange = (event: OnChange) => {

        event.preventDefault()

        const inputName = event.target.name
        const inputValue = event.target.value

        console.log("inputValue", inputValue)

        controlInput({
        setSelectedDiagnosis,
        setDescription,
        setSpecialist,
        setDate,
        setType,
        setSickLeave,
        setEmployerName,
        setDischarge,
        setHealthCheckRating,
        inputName,
        inputValue
    })
    }

    const addDiagnosis = (event: AddDiagnosis) => {

        event.preventDefault()
        console.log("typeof selectedDiagnosisValues", typeof selectedDiagnosisValues, selectedDiagnosisValues)
        if (!selectedDiagnosisValues.includes(selectedDiagnosis)) {

            const newValues = selectedDiagnosisValues?.concat(selectedDiagnosis)
            console.log("selectedDiagnosisValues", selectedDiagnosisValues)
            setSelectedDiagnosisValues(newValues)
        }

    }

    return (
        <div>
            <form onSubmit={addEntry}>
            <InputLabel>Description</InputLabel>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    name="description"
                    onChange={onChange}
                    style={{marginBottom: 15}}
                    />
                <InputLabel>Specialist</InputLabel>
                <TextField
                    label="Specialist"
                    fullWidth
                    name="specialist"
                    value={specialist}
                    onChange={onChange}
                    style={{marginBottom: 15}}
                    />
                <InputLabel>Date</InputLabel>
                <Input
                    name="date"
                    type="date"
                    value={date}
                    onChange={onChange}
                    style={dateStyle}
                />
                <InputLabel>Diagnosis Codes</InputLabel>
                <div style={flexContainer}>
                <Select
                label="Diagnosis"
                name="selectedDiagnosisCode"
                onChange={onChange}
                value={selectedDiagnosis}
                style={halfWidth}
                >
                {diagnosisCodes?.map((option) =>
                <MenuItem
                    key={option}
                    value={option}
                >
                    {option}
                </MenuItem>
                )}
                </Select>
                <InputLabel placeholder="Selected Diagnoses" style={inputStyle}>
                {selectedDiagnosisValues.join(" ")}
                </InputLabel>
                </div>
                <Button 
                color="secondary"
                variant="contained"
                type="button" 
                style={buttonStyle}
                onClick={addDiagnosis}>
                    Add Diagnosis
                </Button>
                <InputLabel>Type</InputLabel>
                <TextField
                    label="Type"
                    fullWidth
                    value={type}
                    name="type"
                    onChange={onChange}
                    style={setMargin}
                    />
                 <InputLabel>Sick Leave</InputLabel>
                    <div style={parentContainer}>
                    <div style={childContainer}>
                    <b>Sick Leave (Start Date)</b>
                <Input
                    name="sickLeaveStartDate"
                    type="date"
                    value={sickLeave.startDate}
                    onChange={onChange}
                    style={{ width: "100%" }}
                />
                    </div>
                    <div style={sickLeaveStyle}>
                    <b>Sick Leave (End Date)</b>
                <Input
                    name="sickLeaveEndDate"
                    type="date"
                    value={sickLeave.endDate}
                    onChange={onChange}
                    style={fullWidth}
                />
                    </div>
                    </div>
                    <InputLabel>Employer Name</InputLabel>
                <TextField
                    label="Employer Name"
                    name="employerName"
                    fullWidth
                    value={employerName}
                    style={{marginBottom: 15}}
                    onChange={onChange}
                    />
                    <InputLabel>Discharge</InputLabel>
                    <div style={dischargeParentComponentStyle}>
                    <div style={dischargeChildComponentStyle}>
                    <b>Discharge Date</b>
                    <Input
                    name="dischargeDate"
                    type="date"
                    value={discharge.date}
                    onChange={onChange}
                    style={fullWidth}
                />
                </div>
                    <div style={curvedBorderStyle}>
                    <b>Discharge Criteria</b>
                <TextField
                    label="Discharge Criteria"
                    name="dischargeCriteria"
                    fullWidth
                    value={discharge.criteria}
                    onChange={onChange}
                    />
                    </div>
                    </div>
                    <Select
                    label="healthCheckRating"
                    name="healthCheckRating"
                    onChange={onChange}
                    value={healthCheckRating.toString()}
                    style={quarterWidth}
                >
                    {Array.from({ length: 19 }).map((_, idx) => (
                        <MenuItem key={idx.toString()} value={(idx + 1).toString()}>
                            {(idx + 1).toString()}
                        </MenuItem>
                    ))}
                </Select>

                <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={floatLeftButton}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={floatRightButton}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
            </form>
        </div>
    )
}

export default AddEntryForm