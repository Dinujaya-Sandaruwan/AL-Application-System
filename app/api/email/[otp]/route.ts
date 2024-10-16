import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";
import { OTPSingleton } from "@/app/database/data/OTPSingleton";
import dbConnect from "@/app/database/database";
import ExistingStudent from "@/app/models/e_student";
import OtpModel from "@/app/models/otp";

interface Params {
  otp: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { otp } = params;

  try {
    await dbConnect();
    const otpEntry = await OtpModel.findOne({ otp });

    if (!otpEntry) {
      return NextResponse.json({
        message: "OTP not found",
      });
    }

    const studentdetails = await ExistingStudent.find({
      email: otpEntry.email,
    });

    return NextResponse.json({
      studentdetails: studentdetails[0],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
