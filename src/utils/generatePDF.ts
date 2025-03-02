import PDFDocument from "pdfkit";
import { Response } from "express";
import axios from "axios";
import { IProduct } from "../interfaces/product.interface";

const downloadImage = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
};

export const generatePDF = async (product: IProduct, res: Response) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${product.id}.pdf`
  );
  doc.pipe(res);
  doc.fontSize(20).text("Product Sheet", { align: "center" });
  doc.moveDown();

  try {
    const imageBuffer = await downloadImage(product.imageURl);
    const pageWidth = doc.page.width;
    const imageWidth = 200;
    const xPosition = (pageWidth - imageWidth) / 2;
    doc.image(imageBuffer, xPosition, doc.y, { fit: [imageWidth, 200] });
  } catch (error) {
    console.error("Error downloading:", error);
  }

  doc.moveDown(10);

  doc.fontSize(14).text(`ID: ${product.id}`);
  doc.moveDown(0.5);
  doc.text(`Name: ${product.name}`);
  doc.moveDown(0.5);
  doc.text(`Description: ${product.description || "No description"}`);
  doc.moveDown(0.5);
  doc.text(`Price: $${product.price}`);
  doc.moveDown(0.5);

  doc.moveDown(1);
  doc
    .strokeColor("#000")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown();

  doc.fontSize(12).fillColor("gray").text("@Developer", { align: "right" });

  doc.end();
};
