import mongoose, { Document, Schema } from "mongoose";

export interface IOtpSchema extends Document {
  otp: string;
  email: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOtpSchema>({
  otp: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 100 },
});

const OtpModel =
  mongoose.models.OTP || mongoose.model<IOtpSchema>("OTP", otpSchema);

export default OtpModel;
