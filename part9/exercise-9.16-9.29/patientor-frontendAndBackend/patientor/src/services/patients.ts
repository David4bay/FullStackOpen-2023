import axios from "axios";
import { Diagnoses, Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientData = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  )
  return data
}

const addEntry = async (id: string, entry: Entry): Promise<Entry[]> => {
  const { data } = await axios.post<Entry[]>(
    `${apiBaseUrl}/patients/${id}/entries`, {entry}
  )
  return data
}

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnoses>(
    `${apiBaseUrl}/diagnoses`
  )
  return data
}

export default {
  getAll, create, getPatientData, addEntry, getDiagnoses
};

