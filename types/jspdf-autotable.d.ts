// types/jspdf-autotable.d.ts
declare module "jspdf-autotable" {
  const autoTable: any;
  export default autoTable;
}

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number; // finalY is typically used to know where the last table ended
    };
    getNumberOfPages(): number;
  }
}
