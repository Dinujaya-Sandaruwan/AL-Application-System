"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DBLoading from "../components/DBLoading";
import CheckingAnimation from "@/public/animations/dataAdding.json";
import CheckingDoneAnimation from "@/public/animations/DBSearchDone.json";
import useExStudentStore from "../global/ExistingStudentData";
import useIndexNoStore from "../global/indexNoStore";

const Page = () => {
  const router = useRouter();
  const [animation, setAnimation] = useState(CheckingAnimation);
  const [animate, setAnimate] = useState(true);
  const [title, setTitle] = useState("Checking your data");

  const { studentType } = useExStudentStore();
  const { indexNo } = useIndexNoStore();

  const refNo =
    studentType === "Existing Student" ? `E${indexNo}` : `N${indexNo}`;

  useEffect(() => {
    if (!indexNo) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      // setAnimation(CheckingDoneAnimation);
      setTitle("Data added successfully!");
    }, 8000);

    const timer2 = setTimeout(() => {
      setAnimate(false);
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {/* {animate && <DBLoading title={title} lotteFile={animation} />} */}
      <div className="application-form-container">
        <h1 className="title">A/L Application Form</h1>
        <h2 className="subtitle">Mayurapada Central College Narammala</h2>
        <div className="card">
          <p className="message">
            Your data add successfully as{" "}
            <span className="highlight">{studentType}</span>
          </p>
          <p className="ref-no">Ref No: {refNo}</p>
          <a href="/" className="home-link">
            Go to home page
          </a>
        </div>
      </div>
    </>
  );
};

export default Page;
