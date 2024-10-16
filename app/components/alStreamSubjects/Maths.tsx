import React from "react";
import useExStudentStore from "@/app/global/ExistingStudentData";

const Maths: React.FC = () => {
  const { alSubjects, setALSubjects } = useExStudentStore((state) => ({
    alSubjects: state.studentDetails.alSubjects,
    setALSubjects: state.setALSubjects,
  }));

  const handleSubjectChange = (index: number, subject: string) => {
    const newSubjects = [...alSubjects.subject];
    newSubjects[index] = { ...newSubjects[index], subject };
    setALSubjects("maths", newSubjects);
  };

  const handleMediumChange = (medium: string) => {
    const newSubjects = alSubjects.subject.map((subj) => ({ ...subj, medium }));
    setALSubjects("maths", newSubjects);
  };

  React.useEffect(() => {
    // Initialize subjects if they're not set or if the first two subjects are not correctly set
    if (
      alSubjects.subject.length === 0 ||
      alSubjects.subject[0].subject !== "Combined Maths" ||
      alSubjects.subject[1].subject !== "Physics"
    ) {
      setALSubjects("maths", [
        { subject: "Combined Maths", medium: "Sinhala" },
        { subject: "Physics", medium: "Sinhala" },
        { subject: "", medium: "Sinhala" },
      ]);
    }
  }, [alSubjects.subject, setALSubjects]);

  return (
    <fieldset className="fieldSet">
      <legend>A/L Subject selection</legend>
      <div className="twoCols">
        <div className="inputGroup">
          <label>First Subject</label>
          <input type="text" value="Combined Maths" readOnly />
        </div>
        <div className="inputGroup">
          <label>Second Subject</label>
          <input type="text" value="Physics" readOnly />
        </div>
      </div>
      <div className="inputGroup">
        <label>Select Third Subject</label>
        <select
          value={alSubjects.subject[2]?.subject || ""}
          onChange={(e) => handleSubjectChange(2, e.target.value)}
        >
          <option value="">Select a subject</option>
          <option value="Chemistry">Chemistry</option>
          <option value="ICT">Information and Communication Technology</option>
        </select>
      </div>
      <div className="inputGroup">
        <label>Medium for all subjects</label>
        <select
          value={alSubjects.subject[0]?.medium || "Sinhala"}
          onChange={(e) => handleMediumChange(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Sinhala">Sinhala</option>
        </select>
      </div>
    </fieldset>
  );
};

export default Maths;
