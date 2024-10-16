"use client";

import React from "react";
import Stepper from "awesome-react-stepper";
import Image from "next/image";
import banner from "@images/bannerTwo.jpg";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
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
          {children}
          <div className="footerGap"></div>
        </div>
      </main>
    </>
  );
};

export default Layout;
