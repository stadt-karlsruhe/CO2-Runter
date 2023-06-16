import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";

const QRCodeGenerator = ({ text }) => {
  const qrCodeRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => qrCodeRef.current,
  });

  const handleDownloadImage = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const canvas = qrCodeRef.current.querySelector("canvas");
    const imageData = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imageData, "JPEG", 10, 10, 50, 50);
    pdf.save("qrcode.pdf");
  };

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center"
      }}>
        <div ref={qrCodeRef}>
          <QRCode value={text} />
        </div>
        <Button variant="contained" style={{ marginTop: "10px" }} onClick={handlePrint}>Print</Button>
        <Button variant="contained" style={{ marginTop: "10px" }} onClick={handleDownloadImage}>Download as Image</Button>
        <Button variant="contained" style={{ marginTop: "10px" }} onClick={handleDownloadPDF}>Download as PDF</Button>
      </div>
  );
};

export default QRCodeGenerator;
