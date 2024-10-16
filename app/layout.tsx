import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import badgeImg from "@images/badge.png";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
import "@styles/style.scss";
import { ToastContainer } from "react-toastify";
import Closed from "./components/Closed";

export const metadata: Metadata = {
  title: "Al Application form - Mayurapada Central College",
  description:
    "The Advanced Level Online Application Form for Mayurapada Central College provides a seamless, user-friendly platform for students to apply for A/L admissions. Designed with convenience in mind, this secure web application allows applicants to fill out and submit their details online, ensuring a smooth and efficient process. With clear instructions and easy navigation, it simplifies the application experience for prospective students, enabling them to apply from anywhere at any time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Closed />
      </body>
    </html>
  );
}
