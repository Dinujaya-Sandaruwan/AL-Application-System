"use client";

import React from "react";
import Link from "next/link";
import Stepper from "@/app/components/Stepper";
import useExStudentStore from "@/app/global/ExistingStudentData";

const ParentInfoForm = () => {
  const parentInfo = useExStudentStore(
    (state) => state.studentDetails.parentInfo
  );
  const setParentInfo = useExStudentStore((state) => state.setParentInfo);

  const handleParentInfoChange = (
    parent: "father" | "mother" | "guardian",
    field: string,
    value: string
  ) => {
    setParentInfo(
      parent,
      field as keyof (typeof parentInfo)[typeof parent],
      value
    );
  };

  return (
    <>
      <Stepper pageNo={2} />
      <fieldset className="fieldSet">
        <legend>Parents Information - (Father)</legend>
        <div className="inputGroup">
          <label>Father&apos;s Full Name</label>
          <input
            type="text"
            placeholder="Amarasinha Mudiyanselage Susantha Chandrasiri"
            value={parentInfo.father.name}
            onChange={(e) =>
              handleParentInfoChange("father", "name", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Father&apos;s NIC Number</label>
          <input
            type="text"
            placeholder="123456789V"
            value={parentInfo.father.nic_number}
            onChange={(e) =>
              handleParentInfoChange("father", "nic_number", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Father&apos;s Address</label>
          <input
            type="text"
            placeholder="Ihala Dalupothagama, Katupotha (60350)"
            value={parentInfo.father.address}
            onChange={(e) =>
              handleParentInfoChange("father", "address", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Father&apos;s Job</label>
          <input
            type="text"
            placeholder="Doctor"
            value={parentInfo.father.job}
            onChange={(e) =>
              handleParentInfoChange("father", "job", e.target.value)
            }
          />
        </div>
      </fieldset>
      <fieldset className="fieldSet">
        <legend>Parents Information - (Mother)</legend>
        <div className="inputGroup">
          <label>Mother&apos;s Name</label>
          <input
            type="text"
            placeholder="Galmangodage Chandani Priyanka Herath"
            value={parentInfo.mother.name}
            onChange={(e) =>
              handleParentInfoChange("mother", "name", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Mother&apos;s NIC Number</label>
          <input
            type="text"
            placeholder="123456789V"
            value={parentInfo.mother.nic_number}
            onChange={(e) =>
              handleParentInfoChange("mother", "nic_number", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Mother&apos;s Address</label>
          <input
            type="text"
            placeholder="Ihala Dalupothagama, Katupotha (60350)"
            value={parentInfo.mother.address}
            onChange={(e) =>
              handleParentInfoChange("mother", "address", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Mother&apos;s job</label>
          <input
            type="text"
            placeholder="House Wife"
            value={parentInfo.mother.job}
            onChange={(e) =>
              handleParentInfoChange("mother", "job", e.target.value)
            }
          />
        </div>
      </fieldset>
      <fieldset className="fieldSet">
        <legend>Parents Information - (Guardian)</legend>
        <div className="inputGroup">
          <label>Guardian&apos;s Name:</label>
          <input
            type="text"
            placeholder="Amarasinha Mudiyanselage Susantha Chandrasiri"
            value={parentInfo.guardian?.name || ""}
            onChange={(e) =>
              handleParentInfoChange("guardian", "name", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Guardian&apos;s NIC Number</label>
          <input
            type="text"
            placeholder="123456789V"
            value={parentInfo.guardian?.nic_number || ""}
            onChange={(e) =>
              handleParentInfoChange("guardian", "nic_number", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Guardian&apos;s Address</label>
          <input
            type="text"
            placeholder="Ihala Dalupothagama, Katupotha (60350)"
            value={parentInfo.guardian?.address || ""}
            onChange={(e) =>
              handleParentInfoChange("guardian", "address", e.target.value)
            }
          />
        </div>
        <div className="inputGroup">
          <label>Guardian&apos;s job</label>
          <input
            type="text"
            placeholder="Engineer"
            value={parentInfo.guardian?.job || ""}
            onChange={(e) =>
              handleParentInfoChange("guardian", "job", e.target.value)
            }
          />
        </div>
      </fieldset>
      <div className="navigateBtns">
        <Link href="/existing-student-form/personal-info" className="backBtn">
          Back
        </Link>
        <Link href="/existing-student-form/ol-results" className="nextBtn">
          Next
        </Link>
      </div>
    </>
  );
};

export default ParentInfoForm;
