import React, { useEffect } from "react";
import useExStudentStore from "@/app/global/ExistingStudentData";

const Technology: React.FC = () => {
  const { alSubjects, setALSubjects } = useExStudentStore((state) => ({
    alSubjects: state.studentDetails.alSubjects,
    setALSubjects: state.setALSubjects,
  }));

  const handleSubjectChange = (
    index: number,
    subject: string,
    medium: string = "Sinhala"
  ) => {
    const newSubjects = [...alSubjects.subject];
    newSubjects[index] = { subject, medium };
    setALSubjects("technology", newSubjects);
  };

  React.useEffect(() => {
    // Initialize subjects if they're not set
    if (alSubjects.subject.length === 0) {
      setALSubjects("technology", [
        { subject: "Science For Technology", medium: "Sinhala" },
        { subject: "", medium: "Sinhala" },
        { subject: "", medium: "Sinhala" },
      ]);
    }
  }, [alSubjects.subject, setALSubjects]);

  useEffect(() => {
    handleSubjectChange(0, "Science For Technology");
  }, []);

  return (
    <fieldset className="fieldSet">
      <legend>A/L Subject selection</legend>
      <div className="inputGroup">
        <label>First Subject</label>
        <select
          disabled
          value="Science For Technology"
          onChange={(e) => handleSubjectChange(0, e.target.value)}
        >
          <option value="Science For Technology">Science For Technology</option>
        </select>
      </div>
      <div className="twoCols">
        <div className="inputGroup">
          <label>Second Subject</label>
          <select
            value={alSubjects.subject[1]?.subject || ""}
            onChange={(e) => handleSubjectChange(1, e.target.value)}
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="Engineering Technology">
              Engineering Technology
            </option>
            <option value="Bio System Technology">Bio System Technology</option>
          </select>
        </div>
        <div className="inputGroup">
          <label>Third Subject</label>
          <select
            value={alSubjects.subject[2]?.subject || ""}
            onChange={(e) => handleSubjectChange(2, e.target.value)}
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="ICT">
              Information and Communication Technology
            </option>
            <option value="Agricultural Technology">
              Agricultural Technology
            </option>
            <option value="Geography">Geography</option>
            <option value="Economics">Economics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Communication and Media Studies">
              Communication and Media Studies
            </option>
            <option value="Drawing">Drawing</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
};

export default Technology;
