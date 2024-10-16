"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Stepper from "@/app/components/Stepper";
import useExStudentStore from "@/app/global/ExistingStudentData";
import { useRouter } from "next/navigation";
import useIndexNoStore from "@/app/global/indexNoStore";
import { toast } from "react-toastify";

const ExistingStudent = () => {
  const { indexNo } = useIndexNoStore();
  const router = useRouter();
  useEffect(() => {
    if (!indexNo) {
      router.push("/");
    }
  }, []);
  const studentDetails = useExStudentStore((state) => state.studentDetails);
  const setOldClass = useExStudentStore((state) => state.setOldClass);
  const setPersonalInfo = useExStudentStore((state) => state.setPersonalInfo);
  const setEmail = useExStudentStore((state) => state.setEmail);

  const showAlert = () => {
    toast.error("Please fill all fields!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const goToNextPage = () => {
    const fieldsToCheck = [
      studentDetails.oldclass.olClass,
      studentDetails.oldclass.olClassTeacher,
      studentDetails.personalInfo.fullname,
      studentDetails.personalInfo.name_with_initials,
      studentDetails.personalInfo.birthday,
      studentDetails.personalInfo.age,
      studentDetails.personalInfo.sex,
      studentDetails.personalInfo.nic_number,
      studentDetails.personalInfo.address,
      studentDetails.personalInfo.contact_number,
      studentDetails.personalInfo.whatsapp_number,
      studentDetails.personalInfo.distance_to_school,
      studentDetails.personalInfo.transport_method,
      studentDetails.personalInfo.scholarship,
      studentDetails.email,
    ];

    const allFieldsFilled = fieldsToCheck.every(
      (field) => field !== undefined && field !== ""
    );

    if (!allFieldsFilled) {
      showAlert();
      return;
    }

    router.push("/existing-student-form/parent-info");
  };

  return (
    <>
      <Stepper pageNo={1} />
      <fieldset className="fieldSet">
        <legend>OL Class Information</legend>
        <div className="inputGroup">
          <label>OL Class Indxe No.</label>
          <input
            type="number"
            placeholder="12345"
            value={studentDetails.oldclass.indexno}
            onChange={(e) => setOldClass("indexno", e.target.value)}
          />
        </div>
        <div className="twoCols">
          <div className="inputGroup">
            <label>OL Class</label>
            <input
              type="text"
              placeholder="B"
              value={studentDetails.oldclass.olClass}
              onChange={(e) => setOldClass("olClass", e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>OL Class Teacher</label>
            <input
              type="text"
              placeholder="Mr. Tiran Jayasooriya"
              value={studentDetails.oldclass.olClassTeacher}
              onChange={(e) => setOldClass("olClassTeacher", e.target.value)}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="fieldSet">
        <legend>Personal Information</legend>
        <div className="inputGroup">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Mahaulpathagamalage Priyantha Sampath Mahaulpathagama"
            value={studentDetails.personalInfo.fullname}
            disabled
            // onChange={(e) => setPersonalInfo("fullname", e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label>Name With Initials:</label>
          <input
            type="text"
            placeholder="M. P. S. Mahaulpathagama"
            value={studentDetails.personalInfo.name_with_initials}
            onChange={(e) =>
              setPersonalInfo("name_with_initials", e.target.value)
            }
          />
        </div>
        <div className="twoCols">
          <div className="inputGroup">
            <label>Birth Day</label>
            <input
              type="date"
              value={studentDetails.personalInfo.birthday}
              onChange={(e) => setPersonalInfo("birthday", e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>Age as on (1-1-2024)</label>
            <input
              type="number"
              placeholder="19"
              value={studentDetails.personalInfo.age}
              onChange={(e) => setPersonalInfo("age", parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="inputGroup">
          <label>Gender</label>
          <select
            value={studentDetails.personalInfo.sex}
            onChange={(e) => setPersonalInfo("sex", e.target.value)}
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="inputGroup">
          <label>NIC Number</label>
          <input
            type="text"
            placeholder="123456789012"
            value={studentDetails.personalInfo.nic_number}
            onChange={(e) => setPersonalInfo("nic_number", e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label>Address</label>
          <input
            type="text"
            placeholder="123 Main St, City, Country"
            value={studentDetails.personalInfo.address}
            onChange={(e) => setPersonalInfo("address", e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={studentDetails.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="twoCols">
          <div className="inputGroup">
            <label>Contact Number</label>
            <input
              type="tel"
              placeholder="076 123 4567"
              value={studentDetails.personalInfo.contact_number}
              onChange={(e) =>
                setPersonalInfo("contact_number", e.target.value)
              }
            />
          </div>
          <div className="inputGroup">
            <label>Whatsapp Number</label>
            <input
              type="tel"
              placeholder="076 123 4567"
              value={studentDetails.personalInfo.whatsapp_number}
              onChange={(e) =>
                setPersonalInfo("whatsapp_number", e.target.value)
              }
            />
          </div>
        </div>
        <div className="twoCols">
          <div className="inputGroup">
            <label>Distance To School</label>
            <input
              type="number"
              placeholder="15"
              value={studentDetails.personalInfo.distance_to_school}
              onChange={(e) =>
                setPersonalInfo("distance_to_school", parseInt(e.target.value))
              }
            />
          </div>
          <div className="inputGroup">
            <label>Transport Method</label>
            <input
              type="text"
              placeholder="Bus"
              value={studentDetails.personalInfo.transport_method}
              onChange={(e) =>
                setPersonalInfo("transport_method", e.target.value)
              }
            />
          </div>
        </div>
        <div className="inputGroup">
          <label>Scholarship</label>
          <select
            value={studentDetails.personalInfo.scholarship}
            onChange={(e) => setPersonalInfo("scholarship", e.target.value)}
          >
            <option value="" disabled>
              Select here
            </option>
            <option value="have">Have</option>
            <option value="not have">Not Have</option>
          </select>
        </div>
        <div className="inputGroup">
          <label>Additional Victories</label>
          <textarea
            placeholder="Scouting, Sports, ICT, etc."
            rows={5}
            value={studentDetails.personalInfo.victories}
            onChange={(e) => setPersonalInfo("victories", e.target.value)}
          />
        </div>
      </fieldset>
      <div className="navigateBtns">
        <Link href="/guide" className="backBtn">
          Back
        </Link>
        <button onClick={goToNextPage} className="nextBtn">
          Next
        </button>
      </div>
    </>
  );
};

export default ExistingStudent;
