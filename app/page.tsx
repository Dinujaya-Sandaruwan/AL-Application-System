import Image from "next/image";
import bgImg from "@images/home_bg.jpg";
import schoolBadge from "@images/badge.png";
import DBLoading from "./components/DBLoading";
import DBAnimateJson from "@animations/searchDb.json";
import DBSearchDoneJson from "@animations/DBSearchDone.json";
import IndexNoForm from "./components/IndexNoForm";

export default function Home() {
  return (
    <>
      <DBLoading title="Searching in the Database" lotteFile={DBAnimateJson} />
      <main className="main">
        <aside className="main__left-and-write">
          <Image
            src={schoolBadge}
            alt="School Badge"
            className="school-badge"
          />
          <h4 className="sub-heading-top">Welcome to</h4>
          <h3 className="main-heading">
            Online Application Portal Of Mayurapada Central College
          </h3>
          <h4 className="sub-heading-bottom">For Advanced-Level Exam 2026</h4>
          <IndexNoForm />
          <div className="already-applied">
            Do you already appliy for this?{" "}
            <span className="check-data-btn">CLICK HERE</span> to check your
            submited details
          </div>
        </aside>
        <aside className="main__left-and-write">
          <Image
            src={bgImg}
            alt="background"
            className="bg-image"
            objectFit="cover"
          />
        </aside>

        <footer className="footer">
          Copyright &copy; Mayurapada Central College: All rights resived.
        </footer>
      </main>
    </>
  );
}
