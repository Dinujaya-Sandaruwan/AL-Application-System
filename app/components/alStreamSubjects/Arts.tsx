import React, { useState } from "react";
import useExStudentStore from "@/app/global/ExistingStudentData";
import useArtClassType from "@/app/global/ArtsTypeStore";

const Arts = () => {
  const { classType, setClassType } = useArtClassType();
  const { alSubjects, setALSubjects } = useExStudentStore((state) => ({
    alSubjects: state.studentDetails.alSubjects,
    setALSubjects: state.setALSubjects,
  }));

  const handleSubjectChange = (index: number, subject: string) => {
    const newSubjects = [...alSubjects.subject];
    newSubjects[index] = { subject, medium: "Sinhala" };
    setALSubjects("art", newSubjects);
  };

  React.useEffect(() => {
    // Initialize subjects with Sinhala medium if they're not set
    if (alSubjects.subject.length === 0) {
      setALSubjects("art", [
        { subject: "", medium: "Sinhala" },
        { subject: "", medium: "Sinhala" },
        { subject: "", medium: "Sinhala" },
      ]);
    }
  }, [alSubjects.subject, setALSubjects]);

  return (
    <fieldset className="fieldSet">
      <legend>A/L Subject selection</legend>

      <div className="inputGroup">
        <label>Select Your Subject Category</label>
        <select
          onChange={(event) => setClassType(event.target.value)}
          value={classType}
        >
          <option value="" disabled>
            Category
          </option>
          <option value="one">Social Sciences Subjects</option>
          <option value="two">Languages ​​and Other Subjects</option>
          <option value="three">Aesthetics Subjects</option>
        </select>
        {classType === "one" && (
          <>
            <div className="inputGroup">
              <label>Select First Subject</label>
              <select
                value={alSubjects.subject[0]?.subject || ""}
                onChange={(e) => handleSubjectChange(0, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Communication and Media Studies">
                  Communication and Media Studies
                </option>
                <option value="Economics">Economics</option>
                <option value="Geography">Geography</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Select Second Subject</label>
              <select
                value={alSubjects.subject[1]?.subject || ""}
                onChange={(e) => handleSubjectChange(1, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="History">History</option>
                <option value="Political Science">Political Science</option>
                <option value="Home Science">Home Science</option>
                <option value="Agricultural Science">
                  Agricultural Science
                </option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Select Third Subject</label>
              <select
                value={alSubjects.subject[2]?.subject || ""}
                onChange={(e) => handleSubjectChange(2, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Sinhala Literature">Sinhala Literature</option>
                <option value="Logic">Logic</option>
                <option value="Buddhist Civilization">
                  Buddhist Civilization
                </option>
                <option value="Information and Communication Technology">
                  Information and Communication Technology
                </option>
                <option value="Economics">Economics</option>
              </select>
            </div>
          </>
        )}
        {classType === "two" && (
          <>
            <div className="inputGroup">
              <label>Select First Subject</label>
              <select
                value={alSubjects.subject[0]?.subject || ""}
                onChange={(e) => handleSubjectChange(0, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Chinese language">Chinese language</option>
                <option value="Korean language">Korean language</option>
                <option value="French language">French language</option>
                <option value="Hindi language">Hindi language</option>
                <option value="Japanese language">Japanese language</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Select Second Subject</label>
              <select
                value={alSubjects.subject[1]?.subject || ""}
                onChange={(e) => handleSubjectChange(1, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Political Science">Political Science</option>
                <option value="Communication and Media Studies">
                  Communication and Media Studies
                </option>
                <option value="English Literature">English Literature</option>
                <option value="Buddhist Civilization">
                  Buddhist Civilization
                </option>
                <option value="Agricultural Science">
                  Agricultural Science
                </option>
                <option value="Geography">Geography</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Select Third Subject</label>
              <select
                value={alSubjects.subject[2]?.subject || ""}
                onChange={(e) => handleSubjectChange(2, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Sinhala Literature">Sinhala Literature</option>
                <option value="Information and Communication Technology">
                  Information and Communication Technology
                </option>
                <option value="Logic">Logic</option>
                <option value="Home Science">Home Science</option>
              </select>
            </div>
          </>
        )}
        {classType === "three" && (
          <>
            <div className="inputGroup">
              <label>Select First Subject</label>
              <select
                value={alSubjects.subject[0]?.subject || ""}
                onChange={(e) => handleSubjectChange(0, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Communication and Media Studies">
                  Communication and Media Studies
                </option>
                <option value="Geography">Geography</option>
                <option value="Political Science">Political Science</option>
                <option value="Information and Communication Technology">
                  Information and Communication Technology
                </option>
                <option value="Drama & Theatre">Drama & Theatre</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Select Second Subject</label>
              <select
                value={alSubjects.subject[1]?.subject || ""}
                onChange={(e) => handleSubjectChange(1, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="History">History</option>
                <option value="Sinhala Literature">Sinhala Literature</option>
                <option value="Home Science">Home Science</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Select Third Subject</label>
              <select
                value={alSubjects.subject[2]?.subject || ""}
                onChange={(e) => handleSubjectChange(2, e.target.value)}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Arts & Drawing">Arts & Drawing</option>
                <option value="Dancing">Dancing</option>
                <option value="Music">Music</option>
              </select>
            </div>
          </>
        )}
      </div>
    </fieldset>
  );
};

export default Arts;
