import { Dispatch, SetStateAction } from "react";

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface ControlTypes {
    setSelectedDiagnosis: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setSpecialist: Dispatch<SetStateAction<string>>;
    setDate: Dispatch<SetStateAction<string>>;
    setType: Dispatch<SetStateAction<string>>;
    setDischarge: Dispatch<SetStateAction<Discharge>>;
    setSickLeave: Dispatch<SetStateAction<SickLeave>>;
    setEmployerName: Dispatch<SetStateAction<string>>;
    setHealthCheckRating: Dispatch<SetStateAction<number>>;
    inputName: string;
    inputValue: string;
}

export const controlInput = (values: ControlTypes) => {

    const {
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
} = values

    switch(inputName) {
        case "selectedDiagnosisCode":
            setSelectedDiagnosis(inputValue);
            break;
        case "description":
            setDescription(inputValue);
            break;
        case "specialist":
            setSpecialist(inputValue);
            break;
        case "date":
            setDate(inputValue);
            break;
        case "type":
            setType(inputValue);
            break;
        case "sickLeaveStartDate":
            setSickLeave((prevValues) => ({
                startDate: inputValue,
                endDate: prevValues.endDate
            }));
            break;
        case "sickLeaveEndDate":
            setSickLeave((prevValues) => ({
                startDate: prevValues.startDate,
                endDate: inputValue 
            }));
            break;
        case "employerName":
            setEmployerName(inputValue);
            break;
        case "dischargeDate":
            setDischarge((prevDischarge) => (
                {   date: inputValue,
                    criteria: prevDischarge.criteria 
                }))
            break;
        case "dischargeCriteria":
            setDischarge((prevDischarge) => (
                {   date: prevDischarge.date, 
                    criteria: inputValue 
                }));
            break;
        case "healthCheckRating":
            setHealthCheckRating(Number(inputValue));
            break;
        default:
            break;
    }  
};
