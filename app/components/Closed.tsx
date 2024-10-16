import Image from "next/image";
import React from "react";
import schoolBadge from "@images/badge.png";

const Closed = () => {
  return (
    <div className="closed">
      {/* <Image src={schoolBadge} alt="School Badge" className="school-badge" /> */}
      <h1>Registration Closed</h1>
    </div>
  );
};

export default Closed;
