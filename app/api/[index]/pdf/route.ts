import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf";
import nodemailer from "nodemailer";
import { Readable } from "stream";
import ExistingStudent from "@/app/models/e_student";
import dbConnect from "@/app/database/database";
import { generatePdf } from "@/app/models/generatePdf";

import fs from "fs/promises";
import path from "path";
import { Console } from "console";

// Define interfaces for our data structures
interface PersonalInfo {
  fullname: string;
  birthday: string;
  nic_number: string;
  address: string;
  contact_number: string;
}

interface OLResults {
  first_attempt: {
    [key: string]: string;
  };
}

interface ALSubject {
  subject: string;
  medium: string;
}

interface ALSubjects {
  stream: string;
  subject: ALSubject[];
}

interface Student {
  personalInfo: PersonalInfo;
  olResults: OLResults;
  alSubjects: ALSubjects;
  email: string;
}

interface Params {
  index: string;
}

// Assuming ExistingStudent is a Mongoose model

export async function GET(
  req: NextRequest,
  { params }: { params: { index: string } }
): Promise<NextResponse> {
  try {
    const { index } = params;

    console.log("GET request - student details for index: ", index);

    await dbConnect(); // Assuming this connects to your MongoDB database

    const studentdetails = await ExistingStudent.find({ olindexno: index });

    if (!studentdetails) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    for (const student of studentdetails) {
      const pdfBuffer = generatePdf(student);
      console.log("PDF generated" + student.email);
      await sendEmailWithAttachment(student.email, Buffer.from(pdfBuffer));
    }
    return NextResponse.json({ "Send Emails": "Done" }, { status: 200 });

    // // TODO: Uncomment this line to send the email
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function createPDF(index: string): Promise<NextResponse> {
  try {
    await dbConnect(); // Assuming this connects to your MongoDB database

    const studentdetails = await ExistingStudent.findOne({ olindexno: index });

    if (!studentdetails) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    console.log("Student details found: ", studentdetails);
    const pdfBuffer = generatePdf(studentdetails);
    console.log("PDF generated");

    // TODO: Uncomment this line to send the email
    await sendEmailWithAttachment(studentdetails.email, Buffer.from(pdfBuffer));

    return NextResponse.json(
      { message: "PDF generated and email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendEmailWithAttachment(
  email: string,
  pdfBuffer: Buffer
): Promise<void> {
  try {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    if (!username || !password || !myEmail) {
      throw new Error("Email configuration is missing");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: username,
        pass: password,
      },
    });

    const mail = await transporter.sendMail({
      from: username,
      to: email,
      replyTo: myEmail,
      subject: `Your AL Application Details`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2>Your AL Application Details</h2>
          <p>Please find attached a PDF containing your application details. Kindly ensure to post it to the "Principal, Mayurapada Central College, Narammala." </p>       
        </div>
      `,
      attachments: [
        {
          filename: "application_details.pdf",
          content: pdfBuffer,
        },
      ],
    });

    console.log("Email sent: ", mail.messageId);
  } catch (error) {
    console.log(error);
  }
}
