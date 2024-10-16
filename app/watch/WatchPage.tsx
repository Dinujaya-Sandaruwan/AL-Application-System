"use client";

import useOLPageStore from "@/app/global/OLPageDataStore";
import React, { useState } from "react";
import Image from "next/image";
import banner from "@images/bannerTwo.jpg";
import PageLoading from "../components/PageLoading";
import { toast } from "react-toastify";

interface StudentDetails {
  _id: string;
  personalInfo: {
    fullname: string;
    name_with_initials: string;
    birthday: string;
    age: number;
    sex: string;
    nic_number: string;
    address: string;
    email: string;
    contact_number: string;
    whatsapp_number: string;
    distance_to_school: number;
    transport_method: string;
    scholarship: string;
    victories: string;
    _id: string;
  };
  olResults: {
    first_attempt: OlAttempt;
    second_attempt: OlAttempt;
    correction: OlAttempt;
    _id: string;
  };
  parentInfo: {
    father: ParentInfo;
    mother: ParentInfo;
    guardian: ParentInfo;
    _id: string;
  };
  alSubjects: {
    stream: string;
    subject: Array<{
      subject: string;
      medium: string;
    }>;
    _id: string;
  };
  oldSchool: {
    name: string;
    address: string;
    zonal: string;
    divisional: string;
    district: string;
    _id: string;
  };
  oldclass: {
    indexno: number;
    olClass: string;
    olClassTeacher: string;
    _id: string;
  };
  time: string;
  olindexno: string;
  email: string;
  appid: string;
  __v: number;
}

interface OlAttempt {
  indexNo?: string;
  attempt?: string;
  mathematics: string;
  science: string;
  english: string;
  history: string;
  religion: string;
  language: string;
  firstsubname: string;
  firstsubgrade: string;
  secondsubname: string;
  secondsubgrade: string;
  thirdsubname: string;
  thirdsubgrade: string;
  _id: string;
}

interface ParentInfo {
  name: string;
  nic_number: string;
  contact_number: string;
  address: string;
  job: string;
  _id: string;
}

const AllData = () => {
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    _id: "",
    personalInfo: {
      fullname: "",
      name_with_initials: "",
      birthday: "",
      age: 0,
      sex: "",
      nic_number: "",
      address: "",
      email: "",
      contact_number: "",
      whatsapp_number: "",
      distance_to_school: 0,
      transport_method: "",
      scholarship: "",
      victories: "",
      _id: "",
    },
    olResults: {
      first_attempt: {
        mathematics: "",
        science: "",
        english: "",
        history: "",
        religion: "",
        language: "",
        firstsubname: "",
        firstsubgrade: "",
        secondsubname: "",
        secondsubgrade: "",
        thirdsubname: "",
        thirdsubgrade: "",
        _id: "",
      },
      second_attempt: {
        mathematics: "",
        science: "",
        english: "",
        history: "",
        religion: "",
        language: "",
        firstsubname: "",
        firstsubgrade: "",
        secondsubname: "",
        secondsubgrade: "",
        thirdsubname: "",
        thirdsubgrade: "",
        _id: "",
      },
      correction: {
        indexNo: "",
        attempt: "",
        mathematics: "",
        science: "",
        english: "",
        history: "",
        religion: "",
        language: "",
        firstsubname: "",
        firstsubgrade: "",
        secondsubname: "",
        secondsubgrade: "",
        thirdsubname: "",
        thirdsubgrade: "",
        _id: "",
      },
      _id: "",
    },
    parentInfo: {
      father: {
        name: "",
        nic_number: "",
        contact_number: "",
        address: "",
        job: "",
        _id: "",
      },
      mother: {
        name: "",
        nic_number: "",
        contact_number: "",
        address: "",
        job: "",
        _id: "",
      },
      guardian: {
        name: "",
        nic_number: "",
        contact_number: "",
        address: "",
        job: "",
        _id: "",
      },
      _id: "",
    },
    alSubjects: {
      stream: "",
      subject: [
        {
          subject: "",
          medium: "",
        },
        {
          subject: "",
          medium: "",
        },
        {
          subject: "",
          medium: "",
        },
      ],
      _id: "",
    },
    oldSchool: {
      name: "",
      address: "",
      zonal: "",
      divisional: "",
      district: "",
      _id: "",
    },
    oldclass: {
      indexno: 0,
      olClass: "",
      olClassTeacher: "",
      _id: "",
    },
    time: "",
    olindexno: "",
    email: "",
    appid: "",
    __v: 0,
  });
  const { olResultCorrect } = useOLPageStore();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${searchText.slice(1)}`);
      if (!response?.ok) {
        setStudentDetails({
          _id: "No Data Found",
          personalInfo: {
            fullname: "No Data Found",
            name_with_initials: "No Data Found",
            birthday: "No Data Found",
            age: 404,
            sex: "No Data Found",
            nic_number: "No Data Found",
            address: "No Data Found",
            email: "No Data Found",
            contact_number: "No Data Found",
            whatsapp_number: "No Data Found",
            distance_to_school: 404,
            transport_method: "No Data Found",
            scholarship: "No Data Found",
            victories: "No Data Found",
            _id: "No Data Found",
          },
          olResults: {
            first_attempt: {
              mathematics: "No Data Found",
              science: "No Data Found",
              english: "No Data Found",
              history: "No Data Found",
              religion: "No Data Found",
              language: "No Data Found",
              firstsubname: "No Data Found",
              firstsubgrade: "No Data Found",
              secondsubname: "No Data Found",
              secondsubgrade: "No Data Found",
              thirdsubname: "No Data Found",
              thirdsubgrade: "No Data Found",
              _id: "No Data Found",
            },
            second_attempt: {
              mathematics: "No Data Found",
              science: "No Data Found",
              english: "No Data Found",
              history: "No Data Found",
              religion: "No Data Found",
              language: "No Data Found",
              firstsubname: "No Data Found",
              firstsubgrade: "No Data Found",
              secondsubname: "No Data Found",
              secondsubgrade: "No Data Found",
              thirdsubname: "No Data Found",
              thirdsubgrade: "No Data Found",
              _id: "No Data Found",
            },
            correction: {
              indexNo: "No Data Found",
              attempt: "No Data Found",
              mathematics: "No Data Found",
              science: "No Data Found",
              english: "No Data Found",
              history: "No Data Found",
              religion: "No Data Found",
              language: "No Data Found",
              firstsubname: "No Data Found",
              firstsubgrade: "No Data Found",
              secondsubname: "No Data Found",
              secondsubgrade: "No Data Found",
              thirdsubname: "No Data Found",
              thirdsubgrade: "No Data Found",
              _id: "No Data Found",
            },
            _id: "No Data Found",
          },
          parentInfo: {
            father: {
              name: "No Data Found",
              nic_number: "No Data Found",
              contact_number: "No Data Found",
              address: "No Data Found",
              job: "No Data Found",
              _id: "No Data Found",
            },
            mother: {
              name: "No Data Found",
              nic_number: "No Data Found",
              contact_number: "No Data Found",
              address: "No Data Found",
              job: "No Data Found",
              _id: "No Data Found",
            },
            guardian: {
              name: "No Data Found",
              nic_number: "No Data Found",
              contact_number: "No Data Found",
              address: "No Data Found",
              job: "No Data Found",
              _id: "No Data Found",
            },
            _id: "No Data Found",
          },
          alSubjects: {
            stream: "No Data Found",
            subject: [
              {
                subject: "No Data Found",
                medium: "No Data Found",
              },
              {
                subject: "No Data Found",
                medium: "No Data Found",
              },
              {
                subject: "No Data Found",
                medium: "No Data Found",
              },
            ],
            _id: "No Data Found",
          },
          oldSchool: {
            name: "No Data Found",
            address: "No Data Found",
            zonal: "No Data Found",
            divisional: "No Data Found",
            district: "No Data Found",
            _id: "No Data Found",
          },
          oldclass: {
            indexno: 404,
            olClass: "No Data Found",
            olClassTeacher: "No Data Found",
            _id: "No Data Found",
          },
          time: "No Data Found",
          olindexno: "No Data Found",
          email: "No Data Found",
          appid: "No Data Found",
          __v: 404,
        });
        throw new Error("Network response was not ok");
      }
      const data = await response?.json();
      setStudentDetails(data?.studentdetails);
    } catch (error) {
      setStudentDetails({
        _id: "No Data Found",
        personalInfo: {
          fullname: "No Data Found",
          name_with_initials: "No Data Found",
          birthday: "No Data Found",
          age: 404,
          sex: "No Data Found",
          nic_number: "No Data Found",
          address: "No Data Found",
          email: "No Data Found",
          contact_number: "No Data Found",
          whatsapp_number: "No Data Found",
          distance_to_school: 404,
          transport_method: "No Data Found",
          scholarship: "No Data Found",
          victories: "No Data Found",
          _id: "No Data Found",
        },
        olResults: {
          first_attempt: {
            mathematics: "No Data Found",
            science: "No Data Found",
            english: "No Data Found",
            history: "No Data Found",
            religion: "No Data Found",
            language: "No Data Found",
            firstsubname: "No Data Found",
            firstsubgrade: "No Data Found",
            secondsubname: "No Data Found",
            secondsubgrade: "No Data Found",
            thirdsubname: "No Data Found",
            thirdsubgrade: "No Data Found",
            _id: "No Data Found",
          },
          second_attempt: {
            mathematics: "No Data Found",
            science: "No Data Found",
            english: "No Data Found",
            history: "No Data Found",
            religion: "No Data Found",
            language: "No Data Found",
            firstsubname: "No Data Found",
            firstsubgrade: "No Data Found",
            secondsubname: "No Data Found",
            secondsubgrade: "No Data Found",
            thirdsubname: "No Data Found",
            thirdsubgrade: "No Data Found",
            _id: "No Data Found",
          },
          correction: {
            indexNo: "No Data Found",
            attempt: "No Data Found",
            mathematics: "No Data Found",
            science: "No Data Found",
            english: "No Data Found",
            history: "No Data Found",
            religion: "No Data Found",
            language: "No Data Found",
            firstsubname: "No Data Found",
            firstsubgrade: "No Data Found",
            secondsubname: "No Data Found",
            secondsubgrade: "No Data Found",
            thirdsubname: "No Data Found",
            thirdsubgrade: "No Data Found",
            _id: "No Data Found",
          },
          _id: "No Data Found",
        },
        parentInfo: {
          father: {
            name: "No Data Found",
            nic_number: "No Data Found",
            contact_number: "No Data Found",
            address: "No Data Found",
            job: "No Data Found",
            _id: "No Data Found",
          },
          mother: {
            name: "No Data Found",
            nic_number: "No Data Found",
            contact_number: "No Data Found",
            address: "No Data Found",
            job: "No Data Found",
            _id: "No Data Found",
          },
          guardian: {
            name: "No Data Found",
            nic_number: "No Data Found",
            contact_number: "No Data Found",
            address: "No Data Found",
            job: "No Data Found",
            _id: "No Data Found",
          },
          _id: "No Data Found",
        },
        alSubjects: {
          stream: "No Data Found",
          subject: [
            {
              subject: "No Data Found",
              medium: "No Data Found",
            },
            {
              subject: "No Data Found",
              medium: "No Data Found",
            },
            {
              subject: "No Data Found",
              medium: "No Data Found",
            },
          ],
          _id: "No Data Found",
        },
        oldSchool: {
          name: "No Data Found",
          address: "No Data Found",
          zonal: "No Data Found",
          divisional: "No Data Found",
          district: "No Data Found",
          _id: "No Data Found",
        },
        oldclass: {
          indexno: 404,
          olClass: "No Data Found",
          olClassTeacher: "No Data Found",
          _id: "No Data Found",
        },
        time: "No Data Found",
        olindexno: "No Data Found",
        email: "No Data Found",
        appid: "No Data Found",
        __v: 404,
      });
      console?.error("Error fetching student details:", error);
      toast.error("Error fetching student details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="wrapper">
      <div className="banner">
        <Image
          src={banner}
          alt="background"
          className="banner-image"
          style={{ width: "100%", height: "auto" }}
          // objectFit="cover"
        />
        <div className="textTitle">
          <h4 className="heading">A/L Application Form</h4>
          <h4 className="subHeading">Mayurapada Central College Narammala</h4>
        </div>
      </div>
      <div className="exisitingStudents">
        {/* <h1 className="mainTitle">
          Applied as{" "}
          {data?.data?.studentType === "ExistingStudent"
            ? "an Existing Student"
            : "an New Student"}
        </h1> */}
        <fieldset className="fieldSet watchsearchContainer">
          <legend>Search in DB</legend>
          <div className="searchInput">
            <label>Ref No.</label>
            <input
              type="text"
              placeholder="N/E1234567"
              onChange={(e) => setSearchText(e?.target?.value)}
              value={searchText}
            />
          </div>
          <button onClick={handleSubmit}>Search</button>
        </fieldset>

        {!loading ? (
          studentDetails._id != "" ? (
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
                    <td>{studentDetails?.oldclass?.olClass}</td>
                  </tr>
                  <tr>
                    <td>O/L Class Teacher</td>
                    <td>{studentDetails?.oldclass?.olClassTeacher}</td>
                  </tr>
                </tbody>
              </table>
              <h2>Old School Infomation</h2>
              <table>
                <thead>
                  <tr>
                    <th>Feild</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Old school name</td>
                    <td>{studentDetails?.oldSchool?.name}</td>
                  </tr>
                  <tr>
                    <td>Old school address</td>
                    <td>{studentDetails?.oldSchool?.address}</td>
                  </tr>
                  <tr>
                    <td>Old school district</td>
                    <td>{studentDetails?.oldSchool?.district}</td>
                  </tr>
                  <tr>
                    <td>Old school Division</td>
                    <td>{studentDetails?.oldSchool?.divisional}</td>
                  </tr>
                  <tr>
                    <td>Old school zone</td>
                    <td>{studentDetails?.oldSchool?.zonal}</td>
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
                    <td>{studentDetails?.personalInfo?.fullname}</td>
                  </tr>
                  <tr>
                    <td>Name With Initials</td>
                    <td>{studentDetails?.personalInfo?.name_with_initials}</td>
                  </tr>
                  <tr>
                    <td>Birth Day</td>
                    <td>{studentDetails?.personalInfo?.birthday}</td>
                  </tr>
                  <tr>
                    <td>Age as on (1-1-2024)</td>
                    <td>{studentDetails?.personalInfo?.age}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{studentDetails?.personalInfo?.sex}</td>
                  </tr>
                  <tr>
                    <td>NIC Number</td>
                    <td>{studentDetails?.personalInfo?.nic_number}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{studentDetails?.personalInfo?.address}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{studentDetails?.email}</td>
                  </tr>
                  <tr>
                    <td>Contact Number</td>
                    <td>{studentDetails?.personalInfo?.contact_number}</td>
                  </tr>
                  <tr>
                    <td>Whatsapp Number</td>
                    <td>{studentDetails?.personalInfo?.whatsapp_number}</td>
                  </tr>
                  <tr>
                    <td>Distance To School</td>
                    <td>{studentDetails?.personalInfo?.distance_to_school}</td>
                  </tr>
                  <tr>
                    <td>Transport Method</td>
                    <td>{studentDetails?.personalInfo?.transport_method}</td>
                  </tr>
                  <tr>
                    <td>Scholarship</td>
                    <td>{studentDetails?.personalInfo?.scholarship}</td>
                  </tr>
                  <tr>
                    <td>Additional Victories</td>
                    <td>{studentDetails?.personalInfo?.victories}</td>
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
                    <td>{studentDetails?.parentInfo?.father?.name}</td>
                  </tr>
                  <tr>
                    <td>Father&apos;s NIC Number</td>
                    <td>{studentDetails?.parentInfo?.father?.nic_number}</td>
                  </tr>
                  <tr>
                    <td>Father&apos;s Address</td>
                    <td>{studentDetails?.parentInfo?.father?.address}</td>
                  </tr>
                  <tr>
                    <td>Father&apos;s Contact No?.</td>
                    <td>
                      {studentDetails?.parentInfo?.father?.contact_number}
                    </td>
                  </tr>
                  <tr>
                    <td>Father&apos;s Job</td>
                    <td>{studentDetails?.parentInfo?.father?.job}</td>
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
                    <td>{studentDetails?.parentInfo?.mother?.name}</td>
                  </tr>
                  <tr>
                    <td>Mother&apos;s NIC Number</td>
                    <td>{studentDetails?.parentInfo?.mother?.nic_number}</td>
                  </tr>
                  <tr>
                    <td>Mother&apos;s Address</td>
                    <td>{studentDetails?.parentInfo?.mother?.address}</td>
                  </tr>
                  <tr>
                    <td>Mother&apos;s Contact No?.</td>
                    <td>
                      {studentDetails?.parentInfo?.mother?.contact_number}
                    </td>
                  </tr>
                  <tr>
                    <td>Mother&apos;s job</td>
                    <td>{studentDetails?.parentInfo?.mother?.job}</td>
                  </tr>
                </tbody>
              </table>
              {studentDetails?.parentInfo?.guardian?.name != "" && (
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
                        <td>{studentDetails?.parentInfo?.guardian?.name}</td>
                      </tr>
                      <tr>
                        <td>Guardian&apos;s NIC Number</td>
                        <td>
                          {studentDetails?.parentInfo?.guardian?.nic_number}
                        </td>
                      </tr>
                      <tr>
                        <td>Guardian&apos;s Address</td>
                        <td>{studentDetails?.parentInfo?.guardian?.address}</td>
                      </tr>
                      <tr>
                        <td>Guardian&apos;s Contact No?.</td>
                        <td>
                          {studentDetails?.parentInfo?.guardian?.contact_number}
                        </td>
                      </tr>
                      <tr>
                        <td>Guardian&apos;s job</td>
                        <td>{studentDetails?.parentInfo?.guardian?.job}</td>
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
                    <td>{studentDetails?.olResults?.first_attempt?.indexNo}</td>
                  </tr>
                  <tr>
                    <td>Maths</td>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.mathematics}
                    </td>
                  </tr>
                  <tr>
                    <td>Science</td>
                    <td>{studentDetails?.olResults?.first_attempt?.science}</td>
                  </tr>
                  <tr>
                    <td>English</td>
                    <td>{studentDetails?.olResults?.first_attempt?.english}</td>
                  </tr>
                  <tr>
                    <td>History</td>
                    <td>{studentDetails?.olResults?.first_attempt?.history}</td>
                  </tr>
                  <tr>
                    <td>Religion</td>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.religion}
                    </td>
                  </tr>
                  <tr>
                    <td>Sinhala</td>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.language}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.firstsubname}
                    </td>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.firstsubgrade}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.secondsubname}
                    </td>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.secondsubgrade}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.thirdsubname}
                    </td>
                    <td>
                      {studentDetails?.olResults?.first_attempt?.thirdsubgrade}
                    </td>
                  </tr>
                </tbody>
              </table>

              {studentDetails?.olResults?.second_attempt?.indexNo && (
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
                        <td>
                          {studentDetails?.olResults?.second_attempt?.indexNo}
                        </td>
                      </tr>
                      <tr>
                        <td>Maths</td>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.mathematics
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Science</td>
                        <td>
                          {studentDetails?.olResults?.second_attempt?.science}
                        </td>
                      </tr>
                      <tr>
                        <td>English</td>
                        <td>
                          {studentDetails?.olResults?.second_attempt?.english}
                        </td>
                      </tr>
                      <tr>
                        <td>History</td>
                        <td>
                          {studentDetails?.olResults?.second_attempt?.history}
                        </td>
                      </tr>
                      <tr>
                        <td>Religion</td>
                        <td>
                          {studentDetails?.olResults?.second_attempt?.religion}
                        </td>
                      </tr>
                      <tr>
                        <td>Sinhala</td>
                        <td>
                          {studentDetails?.olResults?.second_attempt?.language}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.firstsubname
                          }
                        </td>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.firstsubgrade
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.secondsubname
                          }
                        </td>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.secondsubgrade
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.thirdsubname
                          }
                        </td>
                        <td>
                          {
                            studentDetails?.olResults?.second_attempt
                              ?.thirdsubgrade
                          }
                        </td>
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
                        <td>
                          {studentDetails?.olResults?.correction?.indexNo}
                        </td>
                      </tr>
                      <tr>
                        <td>Last O/L Attempt</td>
                        <td>
                          {studentDetails?.olResults?.correction?.attempt}
                        </td>
                      </tr>
                      <tr>
                        <td>Maths</td>
                        <td>
                          {studentDetails?.olResults?.correction?.mathematics}
                        </td>
                      </tr>
                      <tr>
                        <td>Science</td>
                        <td>
                          {studentDetails?.olResults?.correction?.science}
                        </td>
                      </tr>
                      <tr>
                        <td>English</td>
                        <td>
                          {studentDetails?.olResults?.correction?.english}
                        </td>
                      </tr>
                      <tr>
                        <td>History</td>
                        <td>
                          {studentDetails?.olResults?.correction?.history}
                        </td>
                      </tr>
                      <tr>
                        <td>Religion</td>
                        <td>
                          {studentDetails?.olResults?.correction?.religion}
                        </td>
                      </tr>
                      <tr>
                        <td>Sinhala</td>
                        <td>
                          {studentDetails?.olResults?.correction?.language}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {studentDetails?.olResults?.correction?.firstsubname}
                        </td>
                        <td>
                          {studentDetails?.olResults?.correction?.firstsubgrade}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {studentDetails?.olResults?.correction?.secondsubname}
                        </td>
                        <td>
                          {
                            studentDetails?.olResults?.correction
                              ?.secondsubgrade
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {studentDetails?.olResults?.correction?.thirdsubname}
                        </td>
                        <td>
                          {studentDetails?.olResults?.correction?.thirdsubgrade}
                        </td>
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
                  {studentDetails?.alSubjects?.subject?.map(
                    (subject, index) => {
                      return (
                        <tr key={index}>
                          <td>{subject?.subject}</td>
                          <td>{subject?.medium}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )
        ) : (
          <PageLoading />
        )}

        <div className="footerGap"></div>
      </div>
    </main>
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
