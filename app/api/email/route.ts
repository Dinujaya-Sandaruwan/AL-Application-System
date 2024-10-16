import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";
import { OTPSingleton } from "@/app/database/data/OTPSingleton";
import dbConnect from "@/app/database/database";
import ExistingStudent from "@/app/models/e_student";
import OtpModel from "@/app/models/otp";

interface Params {
  otp: string;
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    const reqData = await req.json();
    const email = reqData.email;

    if (!username || !password) {
      throw new Error("Missing email credentials");
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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await dbConnect();

    // await OtpModel.create({ otp, email });
    const result = await OtpModel.findOneAndUpdate(
      { email }, // Find by email
      { otp: otp, createdAt: Date.now() }, // Update OTP and reset createdAt
      { new: true, upsert: true } // Return the updated document; create if not found
    );

    console.log("OTP saved in DB:", otp);

    // Uncomment to send email
    const mail = await transporter.sendMail({
      from: username,
      to: email,
      replyTo: myEmail,
      subject: `Your OTP for AL Application`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #105ad0; text-align: center;">AL Application OTP Verification</h2>
            <p style="font-size: 16px; color: #333;">Dear User,</p>
            <p style="font-size: 16px; color: #333;">We received a request to use your email address for an AL Application. Please use the OTP below to verify your email:</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; background-color: #105ad0; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;">${otp}</span>
            </div>
            <p style="font-size: 16px; color: #333;">This OTP is valid for the next 5 minutes. If you did not request this, please ignore this email.</p>
            <p style="font-size: 16px; color: #333;">Best regards,</p>
            <p style="font-size: 16px; color: #333; font-weight: bold;">The AL Application Team</p>
          </div>
          <footer style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
            <p>&copy; 2024 AL Application. All rights reserved.</p>
          </footer>
        </div>
      `,
    });

    return NextResponse.json({ message: "Success: OTP was generated", otp });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const otpSingleton = OTPSingleton.getInstance();

  const studentDetails = Array.from(otpSingleton.getStudent()).reduce(
    (obj, [key, value]) => {
      obj[key] = value;
      return obj;
    },
    {} as Record<string, string>
  );

  console.log(studentDetails);
  return NextResponse.json({
    studentdetails: studentDetails,
  });
}
