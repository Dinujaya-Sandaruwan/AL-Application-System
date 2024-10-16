"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Stepper from "@/app/components/Stepper";
import useExStudentStore from "@/app/global/ExistingStudentData";
import useOLPageStore from "@/app/global/OLPageDataStore";
import useIndexNoStore from "@/app/global/indexNoStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const studentDetails = useExStudentStore((state) => state.studentDetails);
  const setOLResult = useExStudentStore((state) => state.setOLResult);
  const {
    olAttempt = 1,
    olResultCorrect,
    setOlAttempt,
    setOlResultCorrect,
  } = useOLPageStore();
  useEffect(() => {
    setOlAttempt(1);
  }, []);

  const { indexNo } = useIndexNoStore();
  const router = useRouter();
  useEffect(() => {
    if (!indexNo) {
      router.push("/");
    }
  }, []);

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
      studentDetails.olResults.first_attempt.indexNo,
      studentDetails.olResults.first_attempt.mathematics,
      studentDetails.olResults.first_attempt.science,
      studentDetails.olResults.first_attempt.english,
      studentDetails.olResults.first_attempt.history,
      studentDetails.olResults.first_attempt.religion,
      studentDetails.olResults.first_attempt.language,
      studentDetails.olResults.first_attempt.firstsubname,
      studentDetails.olResults.first_attempt.firstsubgrade,
      studentDetails.olResults.first_attempt.secondsubname,
      studentDetails.olResults.first_attempt.secondsubgrade,
      studentDetails.olResults.first_attempt.thirdsubname,
      studentDetails.olResults.first_attempt.thirdsubgrade,
    ];

    const allFieldsFilled = fieldsToCheck.every(
      (field) => field !== undefined && field !== ""
    );

    if (!allFieldsFilled) {
      showAlert();
      return;
    }

    router.push("/new-student-form/al-subjects");
  };
  return (
    <>
      <Stepper pageNo={3} />

      {/* <fieldset className="fieldSet">
        <legend>Get O/L Results</legend>
        <div className="inputGroup">
          <label>Last O/L Attempt</label>
          <select
            onChange={(event) => setOlAttempt(parseInt(event.target.value))}
            defaultValue={0}
          >
            <option value={0} disabled>
              Select your O/L attempt{" "}
            </option>
            <option value={1}>First attempt </option>
            <option value={2}>Second attempt</option>
          </select>
        </div>
      </fieldset> */}
      {olAttempt >= 1 && (
        <fieldset className="fieldSet">
          <legend>O/L Results</legend>
          <div className="inputGroup">
            <label>Index Number</label>
            <input
              type="number"
              placeholder="12345"
              value={studentDetails.olResults.first_attempt.indexNo}
              onChange={(event) =>
                setOLResult("first_attempt", "indexNo", event.target.value)
              }
            />
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>Mathematics</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "mathematics",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.mathematics}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Science</label>
              <select
                onChange={(event) =>
                  setOLResult("first_attempt", "science", event.target.value)
                }
                value={studentDetails.olResults.first_attempt.science}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>English</label>
              <select
                onChange={(event) =>
                  setOLResult("first_attempt", "english", event.target.value)
                }
                value={studentDetails.olResults.first_attempt.english}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>History</label>
              <select
                onChange={(event) =>
                  setOLResult("first_attempt", "history", event.target.value)
                }
                value={studentDetails.olResults.first_attempt.history}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>Religion</label>
              <select
                onChange={(event) =>
                  setOLResult("first_attempt", "religion", event.target.value)
                }
                value={studentDetails.olResults.first_attempt.religion}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Sinhala</label>
              <select
                onChange={(event) =>
                  setOLResult("first_attempt", "language", event.target.value)
                }
                value={studentDetails.olResults.first_attempt.language}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>

          <h3 className="bucket-title">Bucket subjects</h3>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "firstsubname",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.firstsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "firstsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.firstsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "secondsubname",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.secondsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "secondsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.secondsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "thirdsubname",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.thirdsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "first_attempt",
                    "thirdsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.first_attempt.thirdsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
        </fieldset>
      )}
      {olAttempt >= 2 && (
        <fieldset className="fieldSet">
          <legend>O/L Results - Second Attempt</legend>
          <div className="inputGroup">
            <label>Index Number</label>
            <input
              type="number"
              placeholder="12345"
              value={studentDetails.olResults.second_attempt.indexNo}
              onChange={(event) =>
                setOLResult("second_attempt", "indexNo", event.target.value)
              }
            />
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>Maths</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "mathematics",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.mathematics}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Science</label>
              <select
                onChange={(event) =>
                  setOLResult("second_attempt", "science", event.target.value)
                }
                value={studentDetails.olResults.second_attempt.science}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>English</label>
              <select
                onChange={(event) =>
                  setOLResult("second_attempt", "english", event.target.value)
                }
                value={studentDetails.olResults.second_attempt.english}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>History</label>
              <select
                onChange={(event) =>
                  setOLResult("second_attempt", "history", event.target.value)
                }
                value={studentDetails.olResults.second_attempt.history}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>Religion</label>
              <select
                onChange={(event) =>
                  setOLResult("second_attempt", "religion", event.target.value)
                }
                value={studentDetails.olResults.second_attempt.religion}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Sinhala</label>
              <select
                onChange={(event) =>
                  setOLResult("second_attempt", "language", event.target.value)
                }
                value={studentDetails.olResults.second_attempt.language}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>

          <h3 className="bucket-title">Bucket subjects</h3>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "firstsubname",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.firstsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "firstsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.firstsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "secondsubname",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.secondsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "secondsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.secondsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "thirdsubname",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.thirdsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "second_attempt",
                    "thirdsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.second_attempt.thirdsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
        </fieldset>
      )}

      {olAttempt >= 1 && (
        <fieldset className="fieldSet">
          <legend>Change O/L Results</legend>
          <div className="inputGroup">
            <label>This O/L results are:</label>
            <select
              onChange={(event) => setOlResultCorrect(event.target.value)}
              value={olResultCorrect}
            >
              <option value="true">Correct</option>
              <option value="false">There are some mistakes</option>
            </select>
          </div>
        </fieldset>
      )}
      {olResultCorrect === "false" && (
        <fieldset className="fieldSet">
          <legend>O/L Results - Change</legend>
          <div className="inputGroup">
            <label>Index Number</label>
            <input
              type="number"
              placeholder="12345"
              value={studentDetails.olResults.correction.indexNo}
              onChange={(event) =>
                setOLResult("correction", "indexNo", event.target.value)
              }
            />
          </div>
          <div className="inputGroup">
            <label>Last O/L Attempt</label>
            <select
              value={studentDetails.olResults.correction.attempt}
              onChange={(event) =>
                setOLResult("correction", "attempt", event.target.value)
              }
            >
              <option value="" disabled>
                Select your attempt
              </option>
              <option value="First Attempt">First attempt </option>
              <option value="Second Attempt">Second attempt</option>
            </select>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>Maths</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "mathematics", event.target.value)
                }
                value={studentDetails.olResults.correction.mathematics}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Science</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "science", event.target.value)
                }
                value={studentDetails.olResults.correction.science}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>English</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "english", event.target.value)
                }
                value={studentDetails.olResults.correction.english}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>History</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "history", event.target.value)
                }
                value={studentDetails.olResults.correction.history}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="twoCols">
            <div className="inputGroup">
              <label>Religion</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "religion", event.target.value)
                }
                value={studentDetails.olResults.correction.religion}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="inputGroup">
              <label>Sinhala</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "language", event.target.value)
                }
                value={studentDetails.olResults.correction.language}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>

          <h3 className="bucket-title">Bucket subjects</h3>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult("correction", "firstsubname", event.target.value)
                }
                value={studentDetails.olResults.correction.firstsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "firstsubgrade", event.target.value)
                }
                value={studentDetails.olResults.correction.firstsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult("correction", "secondsubname", event.target.value)
                }
                value={studentDetails.olResults.correction.secondsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult(
                    "correction",
                    "secondsubgrade",
                    event.target.value
                  )
                }
                value={studentDetails.olResults.correction.secondsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          <div className="inputGroup-bucket">
            <div className="left">
              <label className="bucket-subject">Subject Name</label>
              <input
                type="text"
                placeholder="Add Subject Name Here"
                onChange={(event) =>
                  setOLResult("correction", "thirdsubname", event.target.value)
                }
                value={studentDetails.olResults.correction.thirdsubname}
              />
            </div>
            <div className="right">
              <label className="bucket-subject">Grade</label>
              <select
                onChange={(event) =>
                  setOLResult("correction", "thirdsubgrade", event.target.value)
                }
                value={studentDetails.olResults.correction.thirdsubgrade}
              >
                <option value="" disabled>
                  Select from your grade
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
        </fieldset>
      )}

      <div className="navigateBtns">
        <Link href="/new-student-form/parent-info" className="backBtn">
          Back
        </Link>
        <button onClick={goToNextPage} className="nextBtn">
          Next
        </button>
      </div>
    </>
  );
};

export default Page;
