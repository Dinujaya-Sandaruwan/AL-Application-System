import dbConnect from "@/app/database/database";
import ExistingStudent from "@/app/models/e_student";
import { generatePdf } from "@/app/models/generatePdf";
import OtpModel from "@/app/models/otp";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  try {
    console.log("GET request");
    await dbConnect();

    const studentdetails = await ExistingStudent.find({});
    console.log("Student details");
    for (const student of studentdetails) {
      var data = `Ready to Add Data - ${student.olindexno} - ${student.email}\n `;
      try {
        const pdfBuffer = generatePdf(student);

        data = data + `pdf generated \n `;
        console.log("PDF generated: " + student.email);
        await sendEmailWithAttachment(student.email, Buffer.from(pdfBuffer));
        data = data + `Email Sent\n `;
      } catch (error) {
        data = data + `Error - ${error}\n `;
      }
      OtpModel.create({ email: student.email, otp: student.olindexno });
    }

    return NextResponse.json({
      studentList: studentdetails,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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
