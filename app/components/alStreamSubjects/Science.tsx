import React from "react";
import useExStudentStore from "@/app/global/ExistingStudentData";

const Science: React.FC = () => {
  const { alSubjects, setALSubjects } = useExStudentStore((state) => ({
    alSubjects: state.studentDetails.alSubjects,
    setALSubjects: state.setALSubjects,
  }));

  const handleSubjectChange = (index: number, subject: string) => {
    const newSubjects = [...alSubjects.subject];
    newSubjects[index] = { subject, medium: "Sinhala" };
    setALSubjects("science", newSubjects);
  };

  React.useEffect(() => {
    // Check if the first two subjects are not set, and initialize them
    if (!alSubjects.subject[0]?.subject || !alSubjects.subject[1]?.subject) {
      setALSubjects("science", [
        { subject: "Biology", medium: "Sinhala" },
        { subject: "Chemistry", medium: "Sinhala" },
        { subject: alSubjects.subject[2]?.subject || "", medium: "Sinhala" },
      ]);
    }
  }, [alSubjects.subject, setALSubjects]);

  return (
    <fieldset className="fieldSet">
      <legend>A/L Subject selection</legend>
      <div className="twoCols">
        <div className="inputGroup">
          <label>First Subject</label>
          <select disabled value="Biology">
            <option value="Biology">Biology</option>
          </select>
        </div>
        <div className="inputGroup">
          <label>Second Subject</label>
          <select disabled value="Chemistry">
            <option value="Chemistry">Chemistry</option>
          </select>
        </div>
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
          <option value="Physics">Physics</option>
          <option value="Agricultural Science">Agricultural Science</option>
        </select>
      </div>
    </fieldset>
  );
};

export default Science;
