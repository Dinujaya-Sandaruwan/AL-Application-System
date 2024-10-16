import dbConnect from "@/app/database/database";
import { NextRequest, NextResponse } from "next/server";
import StudentList from "@/app/models/student_list";
import { promisify } from "util";
import redis from "redis";
import { CasheSingleton } from "@/app/database/data/CasheSingleton";
import ExistingStudent from "@/app/models/e_student";
import { StudentType } from "@/app/utl/studenttype";
import { Console } from "console";
import { create } from "domain";
import { createPDF } from "./pdf/route";

interface Params {
  index: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const cashe = CasheSingleton.getInstance();

    const { index } = params;

    console.log("GET request - student details for index: ", index);

    if (cashe.getStudent().length === 0) {
      console.log("No student in the cashe");
      await dbConnect();
      const studentList = await StudentList.find({});
      cashe.addStudent(studentList[0].indexno);
    }

    const studentList = cashe.getStudent();
    const studentdetails = await ExistingStudent.find({
      olindexno: parseInt(index),
    });
    if (studentdetails.length === 0) {
      return NextResponse.json({ error: "No Data" }, { status: 404 });
    } else if (studentList.includes(parseInt(index))) {
      console.log("Return dta for existing student");
      return NextResponse.json({
        studentType: "ExistingStudent",
        studentdetails: studentdetails[0],
      });
    } else {
      console.log("Return data for new student");
      return NextResponse.json({
        studentType: "NewStudent",
        studentdetails: studentdetails[0],
      });
    }
  } catch (err: any) {
    console.log(
      "Error getting student details for index: ",
      params.index,
      " ",
      err.message
    );
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { index } = params;

  try {
    await dbConnect();

    const studentData = await req.json();

    console.log("POST request - student data for index: ", index);

    if (!studentData) {
      console.log("No data found for index: ", index);
      return NextResponse.json({ error: "No data found" });
    }
    // const student = await ExistingStudent.findOne({ email: studentData.email });

    // if (student) {
    //   console.log("Student already exists for email: ", studentData.email);
    //   return NextResponse.json(
    //     {
    //       error: "Student already exists for email: " + studentData.email,
    //     },
    //     { status: 500 }
    //   );
    // }

    const newStudent = new ExistingStudent();
    newStudent.olindexno = index;
    newStudent.personalInfo = studentData.personalInfo;
    newStudent.alSubjects = studentData.alSubjects;
    newStudent.olResults = studentData.olResults;
    newStudent.parentInfo = studentData.parentInfo;
    newStudent.email = studentData.email;
    newStudent.oldSchool = studentData.oldSchool;
    newStudent.oldclass = studentData.oldclass;
    const otp = Math.floor(10 + Math.random() * 90).toString();

    newStudent.appid =
      studentData.oldclass.indexno == 0 ? `N${index}${otp}` : `E${index}${otp}`;

    const result = await newStudent.save();

    console.log("Data added successfully for index: ", index);

    await createPDF(index);

    return NextResponse.json({ message: "Data added successfully", result });
  } catch (err: any) {
    console.log("Error adding data for index: ", index, " ", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete Student
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { index } = params;

  try {
    await dbConnect();

    console.log("DELETE request - student data for index: ", index);
    const student = await ExistingStudent.findOneAndDelete({
      olindexno: index,
    });
    console.log("Student deleted successfully for index: ", index);
    return NextResponse.json({
      message: "Student deleted successfully",
      student,
    });
  } catch (err: any) {
    console.log("Error deleting student for index: ", index, " ", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
