import { create } from "zustand";

// Define all the interfaces for your data models
interface PersonalInfo {
  fullname: string;
  name_with_initials: string;
  birthday: string;
  age: string;
  sex: string;
  nic_number: string;
  address: string;
  contact_number: string;
  whatsapp_number?: string;
  distance_to_school?: string;
  transport_method?: string;
  scholarship?: string;
  victories?: string;
  _id?: string; // Add the _id here as optional
}

interface OLResultAttempt {
  mathematics: string;
  science: string;
  english: string;
  history: string;
  religion: string;
  language: string;
  firstsubname: string;
  firstsubgrade: string;
  secondsubname: string;
  secondsubgrade: string;
  thirdsubname: string;
  thirdsubgrade: string;
  indexNo?: string;
  _id?: string; // Add the _id here as optional
}

interface ParentDetails {
  name: string;
  nic_number: string;
  contact_number: string;
  address: string;
  job: string;
  _id?: string; // Add the _id here as optional
}

interface ALSubjects {
  stream: string;
  subject: {
    subject: string;
    medium: string;
  }[];
  _id?: string; // Add the _id here as optional
}

interface OldSchool {
  name: string;
  address: string;
  zonal: string;
  divisional: string;
  district: string;
  _id?: string; // Add the _id here as optional
}

interface OldClass {
  indexno: string;
  olClass: string;
  olClassTeacher: string;
  _id?: string; // Add the _id here as optional
}

// Define the full StudentDetails interface
interface StudentDetails {
  personalInfo: PersonalInfo;
  olResults: {
    first_attempt: OLResultAttempt;
    second_attempt: OLResultAttempt;
    correction: OLResultAttempt & { attempt: string };
  };
  parentInfo: {
    father: ParentDetails;
    mother: ParentDetails;
    guardian: ParentDetails;
  };
  alSubjects: ALSubjects;
  oldSchool: OldSchool;
  oldclass: OldClass;
  time: string;
  olindexno: string;
  email: string;
  appid: string;
  __v: number;
}

// Define the Zustand store interface
interface StudentStore {
  studentDetails: Partial<StudentDetails> | null; // studentDetails can be partially filled or null
  updateStudentDetails: (newDetails: Partial<StudentDetails>) => void;
}

// Create the Zustand store with default values and update function
const useStudentStore = create<StudentStore>((set) => ({
  studentDetails: null, // Initialize with null
  updateStudentDetails: (newDetails) =>
    set((state) => ({
      studentDetails: { ...state.studentDetails, ...newDetails }, // Merge newDetails with the existing state
    })),
}));

export default useStudentStore;
