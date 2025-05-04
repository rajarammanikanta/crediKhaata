// src/utils/generatePDF.js
import { jsPDF } from 'jspdf';

export const generatePDF = (data) => {
  const doc = new jsPDF();
  doc.text('Customer Statement', 20, 20);
  doc.text(`Name: ${data.name}`, 20, 30);
  doc.text(`Balance: ₹${data.balance}`, 20, 40);
  // More data here...
  doc.save('customer-statement.pdf');
};
