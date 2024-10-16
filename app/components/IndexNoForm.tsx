"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import setExistingStudentData from "../global/ExistingStudentData";
import useStudentType from "../global/StudentType";
import useExStudentStore from "../global/ExistingStudentData";
import useOLPageStore from "../global/OLPageDataStore";
import indexNoStore from "../global/indexNoStore";
import { set } from "mongoose";

interface Props {
  callBack: (type: string) => void;
}

const IndexNoForm = ({ callBack }: Props) => {
  // const { setStudentType } = useStudentType();
  const { setIndexNo } = indexNoStore();

  const [loading, setLoading] = useState(false);

  const [newIndexNo, setNewIndexNo] = useState("");
  // const [studentType, setStudentType] = useState("");
  const {
    setOLResult,
    setPersonalInfo,
    setStudentType,
    setParentInfo,
    setALSubjects,
    setOldSchool,
    setOldClass,
    setOLIndexNo,
    setEmail,
  } = useExStudentStore();
  const { setOlAttempt } = useOLPageStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIndexNo(e.target.value); // Update local state with input value
  };

  const updateIndexNo = async () => {
    setLoading(true);
    setOLIndexNo(newIndexNo);

    const clearAllData = () => {
      setOLResult("second_attempt", "indexNo", "");
      setOLResult("second_attempt", "mathematics", "");
      setOLResult("second_attempt", "science", "");
      setOLResult("second_attempt", "english", "");
      setOLResult("second_attempt", "history", "");
      setOLResult("second_attempt", "religion", "");
      setOLResult("second_attempt", "language", "");
      setOLResult("second_attempt", "firstsubname", "");
      setOLResult("second_attempt", "firstsubgrade", "");
      setOLResult("second_attempt", "secondsubname", "");
      setOLResult("second_attempt", "secondsubgrade", "");
      setOLResult("second_attempt", "thirdsubname", "");
      setOLResult("second_attempt", "thirdsubgrade", "");
      setOLResult("correction", "indexNo", "");
      setOLResult("correction", "attempt", "");
      setOLResult("correction", "mathematics", "");
      setOLResult("correction", "science", "");
      setOLResult("correction", "english", "");
      setOLResult("correction", "history", "");
      setOLResult("correction", "religion", "");
      setOLResult("correction", "language", "");
      setOLResult("correction", "firstsubname", "");
      setOLResult("correction", "firstsubgrade", "");
      setOLResult("correction", "secondsubname", "");
      setOLResult("correction", "secondsubgrade", "");
      setOLResult("correction", "thirdsubname", "");
      setOLResult("correction", "thirdsubgrade", "");
      setParentInfo("father", "name", "");
      setParentInfo("father", "nic_number", "");
      setParentInfo("father", "contact_number", "");
      setParentInfo("father", "address", "");
      setParentInfo("father", "job", "");
      setParentInfo("mother", "name", "");
      setParentInfo("mother", "nic_number", "");
      setParentInfo("mother", "contact_number", "");
      setParentInfo("mother", "address", "");
      setParentInfo("mother", "job", "");
      setParentInfo("guardian", "name", "");
      setParentInfo("guardian", "nic_number", "");
      setParentInfo("guardian", "contact_number", "");
      setParentInfo("guardian", "address", "");
      setParentInfo("guardian", "job", "");
      setALSubjects("", []);
      setOldSchool("name", "");
      setOldSchool("address", "");
      setOldSchool("zonal", "");
      setOldSchool("divisional", "");
      setOldSchool("district", "");
      setOldClass("indexno", "");
      setOldClass("olClass", "");
      setOldClass("olClassTeacher", "");

      setPersonalInfo("name_with_initials", "");
      setPersonalInfo("birthday", "");
      setPersonalInfo("age", "");
      setPersonalInfo("sex", "");
      setPersonalInfo("nic_number", "");
      setPersonalInfo("address", "");
      setPersonalInfo("contact_number", "");
      setPersonalInfo("whatsapp_number", "");
      setPersonalInfo("victories", "");
      setPersonalInfo("distance_to_school", "");
      setPersonalInfo("transport_method", "");
      setPersonalInfo("scholarship", "");
      setEmail("");
    };

    try {
      const studentData = await axios.get(`/api/${newIndexNo}`);
      if (studentData.data.studentdetails.personalInfo.fullname != "") {
        toast.error("You already applied!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {}

    try {
      const olResult = await axios.get(`/api/${newIndexNo}/result`);

      setIndexNo(newIndexNo);

      if (olResult.data.error === "No data found") {
        console.log("New Student");

        clearAllData();

        setOLResult("first_attempt", "indexNo", "");
        setOLResult("first_attempt", "mathematics", "");
        setOLResult("first_attempt", "science", "");
        setOLResult("first_attempt", "english", "");
        setOLResult("first_attempt", "history", "");
        setOLResult("first_attempt", "religion", "");
        setOLResult("first_attempt", "language", "");
        setOLResult("first_attempt", "firstsubname", "");
        setOLResult("first_attempt", "firstsubgrade", "");
        setOLResult("first_attempt", "secondsubname", "");
        setOLResult("first_attempt", "secondsubgrade", "");
        setOLResult("first_attempt", "thirdsubname", "");
        setOLResult("first_attempt", "thirdsubgrade", "");
        setPersonalInfo("fullname", "");

        setStudentType("New Student");
        callBack("New Student");
      } else {
        console.log("Ex Student");

        const OlData = olResult.data.studentdetails[0];

        setPersonalInfo("fullname", OlData.name);

        const attmpt = "first_attempt";

        setOlAttempt(1);

        setStudentType("Existing Student");

        clearAllData();

        setPersonalInfo("fullname", OlData.name);

        setOLResult(attmpt, "indexNo", OlData.indexno);
        setOLResult(attmpt, "mathematics", OlData.mathematics);
        setOLResult(attmpt, "science", OlData.science);
        setOLResult(attmpt, "english", OlData.english);
        setOLResult(attmpt, "history", OlData.history);
        setOLResult(attmpt, "religion", OlData.religion);
        setOLResult(attmpt, "language", OlData.language);
        setOLResult(attmpt, "firstsubname", OlData.firstsubname);
        setOLResult(attmpt, "firstsubgrade", OlData.firstsubgrade);
        setOLResult(attmpt, "secondsubname", OlData.secondsubname);
        setOLResult(attmpt, "secondsubgrade", OlData.secondsubgrade);
        setOLResult(attmpt, "thirdsubname", OlData.thirdsubname);
        setOLResult(attmpt, "thirdsubgrade", OlData.thirdsubgrade);

        setStudentType("Existing Student");

        callBack("Existing Student");
      }
    } catch (error: any) {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="form">
        <input
          type="number"
          name="text"
          autoComplete="off"
          required
          value={newIndexNo}
          onChange={handleInputChange}
        />
        <label htmlFor="text" className="label-name">
          <span className="content-name">Enter O/L Index No.</span>
        </label>
      </div>
      <button
        className="submit-button"
        onClick={updateIndexNo}
        disabled={loading}
      >
        {loading ? <span>Loading</span> : <span>Apply Now</span>}
      </button>
    </>
  );
};

export default IndexNoForm;
