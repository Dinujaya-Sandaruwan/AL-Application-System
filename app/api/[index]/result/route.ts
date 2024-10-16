import dbConnect from "@/app/database/database";
import ExistingStudent from "@/app/models/e_student";
import OLResultTemplete from "@/app/models/ol_result";

import { NextRequest, NextResponse } from "next/server";

interface Params {
  index: string;
}

// get result
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { index } = params;
  try {
    await dbConnect();
    const trimmedIndex = index.trim();

    // const result = await OLResultTemplete.find({});
    const result = await OLResultTemplete.find({ indexno: parseInt(index) });

    console.log(result);

    if (result.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 200 });
    }

    return NextResponse.json({
      studentdetails: result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err });
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { index } = params;

  try {
    await dbConnect();

    let olresult;
    try {
      olresult = await req.json(); // Parse the JSON input
      console.log(olresult);
      const studentData = new ExistingStudent();
      const result = await OLResultTemplete.find({
        indexno: parseInt(index),
      });

      if (!result) {
        return NextResponse.json({ error: "No data found" }, { status: 404 });
      }
      studentData.olResults.first_attempt = olresult;

      const out = await ExistingStudent.findOneAndUpdate(
        { olindexno: index },
        { $set: { olResults: studentData.olResults } }
      );
      return NextResponse.json({
        message: "Data added successfully",
        out,
      });
    } catch (err) {
      const studentData = new ExistingStudent();
      const result = await OLResultTemplete.find({
        indexno: parseInt(index),
      });

      if (!result) {
        return NextResponse.json({ error: "No data found" }, { status: 404 });
      }
      studentData.olResults.first_attempt = result[0];

      const out = await ExistingStudent.findOneAndUpdate(
        { olindexno: index },
        { $set: { olResults: studentData.olResults } }
      );
      return NextResponse.json({
        message: "Data added successfully",
        out,
      });
    }
    return NextResponse.json({ error: "err.message" }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
