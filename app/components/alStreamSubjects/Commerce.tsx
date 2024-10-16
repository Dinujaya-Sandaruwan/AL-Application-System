import React from "react";
import useExStudentStore from "@/app/global/ExistingStudentData";

const Commerce: React.FC = () => {
  const { alSubjects, setALSubjects } = useExStudentStore((state) => ({
    alSubjects: state.studentDetails.alSubjects,
    setALSubjects: state.setALSubjects,
  }));

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...alSubjects.subject];
    newSubjects[index] = {
      ...newSubjects[index],
      subject: value,
      medium: "Sinhala",
    };
    setALSubjects("commerce", newSubjects);
  };

  React.useEffect(() => {
    // Initialize subjects if they're not set or if the first two subjects are not correctly set
    if (
      alSubjects.subject.length === 0 ||
      alSubjects.subject[0].subject !== "Economics" ||
      alSubjects.subject[1].subject !== "Accounting"
    ) {
      setALSubjects("commerce", [
        { subject: "Economics", medium: "Sinhala" },
        { subject: "Accounting", medium: "Sinhala" },
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
          <input type="text" value="Economics" readOnly />
        </div>
        <div className="inputGroup">
          <label>Second Subject</label>
          <input type="text" value="Accounting" readOnly />
        </div>
      </div>
      <div className="inputGroup">
        <label>Third Subject</label>
        <select
          value={alSubjects.subject[2]?.subject || ""}
          onChange={(e) => handleSubjectChange(2, e.target.value)}
        >
          <option value="">Select Subject</option>
          <option value="Business Studies">Business Studies</option>
          <option value="Information and Communication Technology">
            Information and Communication Technology
          </option>
        </select>
      </div>
    </fieldset>
  );
};

export default Commerce;
