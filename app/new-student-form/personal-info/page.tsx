"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Stepper from "@/app/components/Stepper";
import useExStudentStore from "@/app/global/ExistingStudentData";
import { useRouter } from "next/navigation";
import useIndexNoStore from "@/app/global/indexNoStore";

const ExistingStudent = () => {
  const studentDetails = useExStudentStore((state) => state.studentDetails);
  const setOldClass = useExStudentStore((state) => state.setOldClass);
  const setOldSchool = useExStudentStore((state) => state.setOldSchool);
  const setPersonalInfo = useExStudentStore((state) => state.setPersonalInfo);
  const setEmail = useExStudentStore((state) => state.setEmail);

  const { indexNo } = useIndexNoStore();
  const router = useRouter();
  useEffect(() => {
    if (!indexNo) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Stepper pageNo={1} />
      <fieldset className="fieldSet">
        <legend>Old School Information</legend>
        <div className="inputGroup">
          <label>School Name</label>
          <input
            type="text"
            placeholder="Mayurapada Central College, Narammala"
            value={studentDetails.oldSchool.name}
            onChange={(e) => setOldSchool("name", e.target.value)}
          />
        </div>
        <div className="twoCols">
          <div className="inputGroup">
            <label>School Address</label>
            <input
              type="text"
              placeholder="Dalupothagama, Katupotha"
              value={studentDetails.oldSchool.address}
              onChange={(e) => setOldSchool("address", e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>School Zone</label>
            <input
              type="text"
              placeholder="Giriulla"
              value={studentDetails.oldSchool.zonal}
              onChange={(e) => setOldSchool("zonal", e.target.value)}
            />
          </div>
        </div>
        <div className="twoCols">
          <div className="inputGroup">
            <label>School Division</label>
            <input
              type="text"
              placeholder="Giriulla"
              value={studentDetails.oldSchool.divisional}
              onChange={(e) => setOldSchool("divisional", e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>School District</label>
            <input
              type="text"
              placeholder="Kurunegala"
              value={studentDetails.oldSchool.district}
              onChange={(e) => setOldSchool("district", e.target.value)}
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
            onChange={(e) => setPersonalInfo("fullname", e.target.value)}
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
            <label>Birth Day:</label>
            <input
              type="date"
              value={studentDetails.personalInfo.birthday}
              onChange={(e) => setPersonalInfo("birthday", e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>Age as on (1-1-2024):</label>
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
        <Link href="/new-student-form/parent-info" className="nextBtn">
          Next
        </Link>
      </div>
    </>
  );
};

export default ExistingStudent;
