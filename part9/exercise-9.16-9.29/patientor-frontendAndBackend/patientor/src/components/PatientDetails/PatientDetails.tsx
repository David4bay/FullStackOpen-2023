import { Entry, Patient } from "../../types"
import axios from "axios"
import Entries from "../Entries/Entries"
import React, { useState, useEffect } from "react"
import patientService from "../../services/patients"
import { useNavigate, useParams } from "react-router-dom"
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { Button } from "@mui/material";
import EntryForm from "../EntryForm/EntryForm"

interface SetMessage {
    setMessage: (message: string) => void;
}

function PatientDetails({ setMessage }: SetMessage) {

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [patientInfo, setPatientInfo] = useState<Patient[]>([])

    const navigate = useNavigate()

    const paramsId = useParams().id

    useEffect(() => {
        if (patientInfo?.length! < 1 && paramsId) {
            return fetchPatient(paramsId)
        }
    }, [patientInfo])

    useEffect(() => {

    }, [])

    const openModal = (): void => setModalOpen(true)

    const closeModal = (): void => {
        setModalOpen(false)
        setError(undefined)
    }

    function fetchPatient(id: string) {
        patientService.getPatientData(id).then((data) => {
            setPatientInfo([data])
            setMessage(`Retrieved ${data.name}`)
            console.log("Data from the patientService GET request", data)
            console.log("Patient Info from the patientService", patientInfo)
        }).catch((err) => {
            setMessage(err)
            navigate('/')
            })
    }

    const submitNewEntry = async (id: string, values: Entry): Promise<void> => {

            await patientService.addEntry(id, values).then((newEntry: Entry[]) => {
                console.log("newEntry", newEntry)
                console.log("patientInfo in submitEntry fn", patientInfo)
                const newPatientInfo: any = patientInfo?.findIndex((patientData) => patientData.id === id)

                if (newPatientInfo === -1) throw new Error('Patient does not exist')

                patientInfo[newPatientInfo].entries?.push(newEntry[0])

                setPatientInfo(patientInfo)
                setModalOpen(false)
            }).catch((e: unknown) => {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                      const message = e.response.data.replace("Something went wrong. Error: ", "");
                      console.error(message);
                      setError(message);
                    } else {
                      setError("Unrecognized axios error");
                    }
                  } else {
                    console.error("Unknown error", e)
                    setError("Unknown error")
                  }
                  setModalOpen(false)
            })
    }

    return patientInfo?.map(({
            id,
            name,
            ssn,
            gender,
            occupation,
            entries
        }) => (
            <div key={id}>
            <h2>
            {name} {gender === "Male" ? <MaleOutlinedIcon /> : <FemaleOutlinedIcon /> }
            </h2>
            <p>
            <span>
                <strong>ssn: {ssn}</strong>
            </span>
            <br/>
            <span>
                <strong>occupation: {occupation}</strong>
            </span>
            </p>
                <h3>entries</h3>
            <>
            {entries ? <Entries key={id} entries={entries} /> : null}
            </>
            <EntryForm
             key={id}
             modalOpen={modalOpen}
             onClose={closeModal}
             onSubmit={submitNewEntry}
             error={error}
             />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
            </div>
        )
    )
}

export default PatientDetails