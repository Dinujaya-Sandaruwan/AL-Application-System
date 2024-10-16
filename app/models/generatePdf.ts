import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IEStudent } from "./e_student";

export const generatePdf = (student: IEStudent): ArrayBuffer => {
  const doc = new jsPDF();
  console.log("Generating PDF for student: ", student);

  // Add a logo (Optional)
  // const logo = readFileSync(path.join(process.cwd(), "public", "pdfbg.png"), { encoding: "base64" });
  // doc.addImage(logo, "PNG", 10, 10, 30, 30); // Position logo at top-left

  // Set initial font and color for the PDF
  let yPosition = 30;

  const addHeader = () => {
    // ... (keep the existing header code)
    yPosition = 30;
    doc.setFontSize(10);
    doc.setTextColor("#2C3E50");

    doc.text(
      `${student.alSubjects.stream.toString().toUpperCase()} ${student.appid}`,
      200,
      20,
      {
        align: "right",
      }
    );

    // Title with Center Alignment
    doc.setFontSize(18);
    doc.text("A/L Application - 2024/2026", 105, yPosition, {
      align: "center",
    });

    // School Name
    yPosition += 8;
    doc.setFontSize(14);
    doc.text("Mayurapada Central College", 105, yPosition, { align: "center" });

    // Address and Contact Information
    yPosition += 8;
    doc.setFontSize(12);
    doc.text(
      "Address: B27, Narammala 60100 | Phone: 0372 249 228",
      105,
      yPosition,
      {
        align: "center",
      }
    );
  };

  // Personal Information Section
  addHeader();
  yPosition += 20;
  doc.setFontSize(14);
  doc.setTextColor("#105ad0");
  doc.text("Personal Information", 20, yPosition);

  // Personal Information Table
  const {
    fullname,
    birthday,
    nic_number,
    address,
    contact_number,
    age,
    whatsapp_number,
    distance_to_school,
    transport_method,
    scholarship,
  } = student.personalInfo;

  const personalInfoData = [
    ["Index No", student.olindexno],
    ["Name", fullname],
    ["Date of Birth", new Date(birthday).toLocaleDateString()],
    ["NIC Number", nic_number],
    ["Address", address],
    ["Contact Number", contact_number],
    ["WhatsApp Number", whatsapp_number],
    ["Age", age],
    ["Distance to School", distance_to_school],
    ["Transport Method", transport_method],
    ["Scholarship", scholarship ? "Yes" : "No"],
  ];

  autoTable(doc, {
    startY: yPosition + 10,
    body: personalInfoData,
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "plain",
    tableWidth: "auto", // Adjust table width automatically
    margin: { left: 20, right: 20 }, // Set margins for better alignment
  });

  yPosition += 110;

  const oldSchool = student.oldSchool;
  const oldclass = student.oldclass;

  if (oldclass.indexno == "0" || oldclass.indexno == "") {
    const oldSchoolData = [
      ["Name", oldSchool.name],
      ["Address", oldSchool.address],
      ["Zonal Office", oldSchool.zonal],
      ["Divisional Secretary office", oldSchool.divisional],
      ["District", oldSchool.district],
    ];
    yPosition += 20;
    doc.setFontSize(14);
    doc.setTextColor("#105ad0");
    doc.text("Previous School Details", 20, yPosition);
    autoTable(doc, {
      startY: yPosition + 10,
      body: oldSchoolData,
      styles: { fontSize: 10, cellPadding: 3 },
      theme: "plain",
      tableWidth: "auto", // Adjust table width automatically
      margin: { left: 20, right: 20 }, // Set margins for better alignment
    });
  } else {
    const oldClassData = [
      ["Index No", oldclass.indexno],
      ["Class Class", oldclass.olClass],
      ["Class Teacher ", oldclass.olClassTeacher],
    ];
    yPosition += 20;
    doc.setFontSize(14);
    doc.setTextColor("#105ad0");
    doc.text("Previous Class Details", 20, yPosition);
    autoTable(doc, {
      startY: yPosition + 10,
      body: oldClassData,
      styles: { fontSize: 10, cellPadding: 3 },
      theme: "plain",
      tableWidth: "auto", // Adjust table width automatically
      margin: { left: 20, right: 20 }, // Set margins for better alignment
    });
  }
  doc.addPage();
  addHeader();
  yPosition = 70;

  // O/L Results Section
  //   yPosition = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(14);
  doc.setTextColor("#105ad0");
  doc.text("O/L Results (First Attempt)", 20, yPosition);

  const olResults = student.olResults.first_attempt || {};
  const olTableData = [
    ["Subject", "Grade"],
    ["Mathematics", olResults.mathematics || ""],
    ["Science", olResults.science || ""],
    ["English", olResults.english || ""],
    ["History", olResults.history || ""],
    ["Religion", olResults.religion || ""],
    ["Language", olResults.language || ""],
    [olResults.firstsubname || "", olResults.firstsubgrade || ""],
    [olResults.secondsubname || "", olResults.secondsubgrade || ""],
    [olResults.thirdsubname || "", olResults.thirdsubgrade || ""],
  ];

  autoTable(doc, {
    startY: yPosition + 10,
    head: [olTableData[0]],
    body: olTableData.slice(1),
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [16, 90, 208], textColor: [255, 255, 255] }, // Header background (Blue) and text color (White)
    theme: "grid",
    tableWidth: "auto", // Adjust table width automatically
    margin: { left: 20, right: 20 }, // Set margins for better alignment
  });

  // A/L Subjects Section
  yPosition = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(14);
  doc.setTextColor("#105ad0");
  doc.text(
    `A/L Subjects - Stream: ${student.alSubjects.stream
      .toString()
      .toUpperCase()}`,
    20,
    yPosition
  );

  const alSubjects = student.alSubjects.subject || [];
  const alTableData = [["Subject", "Medium"]].concat(
    alSubjects.map((sub: any) => [
      sub.subject, // Choose whichever subject is available
      sub.medium || "",
    ])
  );
  autoTable(doc, {
    startY: yPosition + 10,
    head: [alTableData[0]],
    body: alTableData.slice(1),
    styles: { fontSize: 10, cellPadding: 3 },
    theme: "grid",
    headStyles: { fillColor: [16, 90, 208], textColor: [255, 255, 255] }, // Header background (Blue) and text color (White)
    tableWidth: "auto", // Adjust table width automatically
    margin: { left: 20, right: 20 }, // Set margins for better alignment
  });

  // Parent Information Section
  doc.addPage();
  addHeader();
  yPosition = 70;

  doc.setFontSize(14);
  doc.setTextColor("#105ad0");
  doc.text("Parent Information", 20, yPosition);

  const parentData = [
    ["Relation", "Name", "Contact Number"],
    [
      "Father",
      student.parentInfo?.father?.name || "",
      student.parentInfo?.father?.contact_number || "",
    ],
    [
      "Mother",
      student.parentInfo?.mother?.name || "",
      student.parentInfo?.mother?.contact_number || "",
    ],
    [
      "Guardian",
      student.parentInfo?.guardian?.name || "",
      student.parentInfo?.guardian?.contact_number || "",
    ],
  ];

  autoTable(doc, {
    startY: yPosition + 10,
    head: [parentData[0]],
    body: parentData.slice(1),
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [16, 90, 208], textColor: [255, 255, 255] }, // Header background (Blue) and text color (White)
    theme: "grid",
    tableWidth: "auto", // Adjust table width automatically
    margin: { left: 20, right: 20 }, // Set margins for better alignment
  });

  // Footer - Signature Line
  doc.setFontSize(10);
  doc.setTextColor("#000000");

  const sstatementY = doc.lastAutoTable.finalY + 30;
  doc.text(
    "I hereby confirm that the information provided above is true and accurate to the best of my knowledge and belief.",
    20,
    sstatementY
  );

  const signatureY = sstatementY + 20;

  doc.text("Student's Signature: ______________________", 20, signatureY);
  doc.text(
    "Parent/Guardian's Signature: ______________________",
    110,
    signatureY
  );

  const dateY = signatureY + 20;
  doc.text("Date: ___________________", 20, dateY);

  // Footer Page Number
  doc.setFontSize(10);

  const pageNumber = doc.getNumberOfPages();
  doc.text(`Page ${pageNumber}`, 105, 290, {
    align: "center",
  });

  // Return the PDF as an ArrayBuffer
  return doc.output("arraybuffer");
};
