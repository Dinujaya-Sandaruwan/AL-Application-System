"use client";

import useExStudentStore from "@/app/global/ExistingStudentData";
import useIndexNoStore from "@/app/global/indexNoStore";
import useOLPageStore from "@/app/global/OLPageDataStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const AllData = () => {
  const studentDetails = useExStudentStore((state) => state.studentDetails);
  const { olResultCorrect } = useOLPageStore();
  const { indexNo } = useIndexNoStore();
  const router = useRouter();
  useEffect(() => {
    if (!indexNo) {
      router.push("/");
    }
  }, []);

  const handleAllSubmit = async () => {
    try {
      const response = await fetch(`/api/${indexNo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetails),
      });

      if (!response.ok) {
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
      } else {
        const data = await response.json();
        console.log("Response:", data);
        router.push("/submited");
      }
    } catch (error) {
      // console.log("Error:", error.message);
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
  };
  return (
    <div className="allDataTable">
      <h2>O/L Class Infomation</h2>
      <table>
        <thead>
          <tr>
            <th>Feild</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>O/L Class</td>
            <td>{studentDetails.oldclass.olClass}</td>
          </tr>
          <tr>
            <td>O/L Class Teacher</td>
            <td>{studentDetails.oldclass.olClassTeacher}</td>
          </tr>
        </tbody>
      </table>
      <h2>Personal Information</h2>
      <table>
        <thead>
          <tr>
            <th>Feild</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{studentDetails.personalInfo.fullname}</td>
          </tr>
          <tr>
            <td>Name With Initials</td>
            <td>{studentDetails.personalInfo.name_with_initials}</td>
          </tr>
          <tr>
            <td>Birth Day</td>
            <td>{studentDetails.personalInfo.birthday}</td>
          </tr>
          <tr>
            <td>Age as on (1-1-2024)</td>
            <td>{studentDetails.personalInfo.age}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{studentDetails.personalInfo.sex}</td>
          </tr>
          <tr>
            <td>NIC Number</td>
            <td>{studentDetails.personalInfo.nic_number}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{studentDetails.personalInfo.address}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{studentDetails.email}</td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td>{studentDetails.personalInfo.contact_number}</td>
          </tr>
          <tr>
            <td>Whatsapp Number</td>
            <td>{studentDetails.personalInfo.whatsapp_number}</td>
          </tr>
          <tr>
            <td>Distance To School</td>
            <td>{studentDetails.personalInfo.distance_to_school}</td>
          </tr>
          <tr>
            <td>Transport Method</td>
            <td>{studentDetails.personalInfo.transport_method}</td>
          </tr>
          <tr>
            <td>Scholarship</td>
            <td>{studentDetails.personalInfo.scholarship}</td>
          </tr>
          <tr>
            <td>Additional Victories</td>
            <td>{studentDetails.personalInfo.victories}</td>
          </tr>
        </tbody>
      </table>

      <h2>Parents Information - (Father)</h2>
      <table>
        <thead>
          <tr>
            <th>Feild</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Father&apos;s Full Name</td>
            <td>{studentDetails.parentInfo.father.name}</td>
          </tr>
          <tr>
            <td>Father&apos;s NIC Number</td>
            <td>{studentDetails.parentInfo.father.nic_number}</td>
          </tr>
          <tr>
            <td>Father&apos;s Address</td>
            <td>{studentDetails.parentInfo.father.address}</td>
          </tr>
          <tr>
            <td>Father&apos;s Contact No.</td>
            <td>{studentDetails.parentInfo.father.contact_number}</td>
          </tr>
          <tr>
            <td>Father&apos;s Job</td>
            <td>{studentDetails.parentInfo.father.job}</td>
          </tr>
        </tbody>
      </table>
      <h2>Parents Information - (Mother)</h2>
      <table>
        <thead>
          <tr>
            <th>Feild</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mother&apos;s Name</td>
            <td>{studentDetails.parentInfo.mother.name}</td>
          </tr>
          <tr>
            <td>Mother&apos;s NIC Number</td>
            <td>{studentDetails.parentInfo.mother.nic_number}</td>
          </tr>
          <tr>
            <td>Mother&apos;s Address</td>
            <td>{studentDetails.parentInfo.mother.address}</td>
          </tr>
          <tr>
            <td>Mother&apos;s Contact No.</td>
            <td>{studentDetails.parentInfo.mother.contact_number}</td>
          </tr>
          <tr>
            <td>Mother&apos;s job</td>
            <td>{studentDetails.parentInfo.mother.job}</td>
          </tr>
        </tbody>
      </table>
      {studentDetails.parentInfo.guardian.name != "" && (
        <>
          <h2>Parents Information - (Guardian)</h2>
          <table>
            <thead>
              <tr>
                <th>Feild</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Guardian&apos;s Name</td>
                <td>{studentDetails.parentInfo.guardian.name}</td>
              </tr>
              <tr>
                <td>Guardian&apos;s NIC Number</td>
                <td>{studentDetails.parentInfo.guardian.nic_number}</td>
              </tr>
              <tr>
                <td>Guardian&apos;s Address</td>
                <td>{studentDetails.parentInfo.guardian.address}</td>
              </tr>
              <tr>
                <td>Guardian&apos;s Contact No.</td>
                <td>{studentDetails.parentInfo.guardian.contact_number}</td>
              </tr>
              <tr>
                <td>Guardian&apos;s job</td>
                <td>{studentDetails.parentInfo.guardian.job}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <h2>O/L Results - Last Attempt</h2>
      <table>
        <thead>
          <tr>
            <th>Feild</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Index Number</td>
            <td>{studentDetails.olResults.first_attempt.indexNo}</td>
          </tr>
          <tr>
            <td>Maths</td>
            <td>{studentDetails.olResults.first_attempt.mathematics}</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>{studentDetails.olResults.first_attempt.science}</td>
          </tr>
          <tr>
            <td>English</td>
            <td>{studentDetails.olResults.first_attempt.english}</td>
          </tr>
          <tr>
            <td>History</td>
            <td>{studentDetails.olResults.first_attempt.history}</td>
          </tr>
          <tr>
            <td>Religion</td>
            <td>{studentDetails.olResults.first_attempt.religion}</td>
          </tr>
          <tr>
            <td>Sinhala</td>
            <td>{studentDetails.olResults.first_attempt.language}</td>
          </tr>
          <tr>
            <td>{studentDetails.olResults.first_attempt.firstsubname}</td>
            <td>{studentDetails.olResults.first_attempt.firstsubgrade}</td>
          </tr>
          <tr>
            <td>{studentDetails.olResults.first_attempt.secondsubname}</td>
            <td>{studentDetails.olResults.first_attempt.secondsubgrade}</td>
          </tr>
          <tr>
            <td>{studentDetails.olResults.first_attempt.thirdsubname}</td>
            <td>{studentDetails.olResults.first_attempt.thirdsubgrade}</td>
          </tr>
        </tbody>
      </table>

      {studentDetails.olResults.second_attempt.indexNo != "" && (
        <>
          <h2>O/L Results - Second Attempt</h2>
          <table>
            <thead>
              <tr>
                <th>Feild</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Index Number</td>
                <td>{studentDetails.olResults.second_attempt.indexNo}</td>
              </tr>
              <tr>
                <td>Maths</td>
                <td>{studentDetails.olResults.second_attempt.mathematics}</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>{studentDetails.olResults.second_attempt.science}</td>
              </tr>
              <tr>
                <td>English</td>
                <td>{studentDetails.olResults.second_attempt.english}</td>
              </tr>
              <tr>
                <td>History</td>
                <td>{studentDetails.olResults.second_attempt.history}</td>
              </tr>
              <tr>
                <td>Religion</td>
                <td>{studentDetails.olResults.second_attempt.religion}</td>
              </tr>
              <tr>
                <td>Sinhala</td>
                <td>{studentDetails.olResults.second_attempt.language}</td>
              </tr>
              <tr>
                <td>{studentDetails.olResults.second_attempt.firstsubname}</td>
                <td>{studentDetails.olResults.second_attempt.firstsubgrade}</td>
              </tr>
              <tr>
                <td>{studentDetails.olResults.second_attempt.secondsubname}</td>
                <td>
                  {studentDetails.olResults.second_attempt.secondsubgrade}
                </td>
              </tr>
              <tr>
                <td>{studentDetails.olResults.second_attempt.thirdsubname}</td>
                <td>{studentDetails.olResults.second_attempt.thirdsubgrade}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {olResultCorrect === "false" && (
        <>
          <h2>Changed O/L Results</h2>
          <table>
            <thead>
              <tr>
                <th>Feild</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Index Number</td>
                <td>{studentDetails.olResults.correction.indexNo}</td>
              </tr>
              <tr>
                <td>Last O/L Attempt</td>
                <td>{studentDetails.olResults.correction.attempt}</td>
              </tr>
              <tr>
                <td>Maths</td>
                <td>{studentDetails.olResults.correction.mathematics}</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>{studentDetails.olResults.correction.science}</td>
              </tr>
              <tr>
                <td>English</td>
                <td>{studentDetails.olResults.correction.english}</td>
              </tr>
              <tr>
                <td>History</td>
                <td>{studentDetails.olResults.correction.history}</td>
              </tr>
              <tr>
                <td>Religion</td>
                <td>{studentDetails.olResults.correction.religion}</td>
              </tr>
              <tr>
                <td>Sinhala</td>
                <td>{studentDetails.olResults.correction.language}</td>
              </tr>
              <tr>
                <td>{studentDetails.olResults.correction.firstsubname}</td>
                <td>{studentDetails.olResults.correction.firstsubgrade}</td>
              </tr>
              <tr>
                <td>{studentDetails.olResults.correction.secondsubname}</td>
                <td>{studentDetails.olResults.correction.secondsubgrade}</td>
              </tr>
              <tr>
                <td>{studentDetails.olResults.correction.thirdsubname}</td>
                <td>{studentDetails.olResults.correction.thirdsubgrade}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <h2>A/L Subject selection</h2>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Medium</th>
          </tr>
        </thead>
        <tbody>
          {studentDetails.alSubjects.subject.map((subject, index) => {
            return (
              <tr key={index}>
                <td>{subject.subject}</td>
                <td>{subject.medium}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="navigateBtns">
        <Link href="/existing-student-form/al-subjects" className="backBtn">
          Back
        </Link>
        <button onClick={handleAllSubmit} className="nextBtn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AllData;

{
  /* <h2></h2>
      <table>
        <thead>
          <tr>
            <th>Feild</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>{studentDetails}</td>
          </tr>
        </tbody>
      </table> */
}
