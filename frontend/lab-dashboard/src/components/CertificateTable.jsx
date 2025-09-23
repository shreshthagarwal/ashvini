import React, { useState } from "react";
import "./CertificateTable.css";

const CertificateTable = () => {
  const [batches, setBatches] = useState([
    { id: 1, herbName: "Ashwagandha", batchId: "F89021", status: "PENDING" },
    { id: 2, herbName: "Shatavari", batchId: "G45678", status: "APPROVED" },
    { id: 3, herbName: "Tulsi", batchId: "F34569", status: "APPROVED" },
    { id: 4, herbName: "Triphala", batchId: "D34521", status: "PENDING" },
    { id: 5, herbName: "Guduchi", batchId: "A20983", status: "APPROVED" },
    { id: 6, herbName: "Neem", batchId: "F56723", status: "APPROVED" },
    { id: 7, herbName: "Brahmi", batchId: "H23439", status: "APPROVED" },
    { id: 8, herbName: "Gotu Kola", batchId: "A3454", status: "PENDING" },
    { id: 9, herbName: "Kalmegh", batchId: "F23409", status: "APPROVED" },
    { id: 10, herbName: "Yavasa", batchId: "C65729", status: "APPROVED" },
    { id: 11, herbName: "Tamalpatra", batchId: "C34098", status: "PENDING" },
    { id: 12, herbName: "Mulethi", batchId: "D23457", status: "APPROVED" },
    { id: 13, herbName: "Bhringraj", batchId: "A33442", status: "APPROVED" },
    { id: 14, herbName: "Amla", batchId: "G12232", status: "PENDING" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Convert file -> Base64 string for storage
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle certificate upload from user’s PC
  const handleAttachCertificate = async (e, batchId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64File = await fileToBase64(file);

      // Save file in localStorage with key = batchId
      localStorage.setItem(`certificate_${batchId}`, base64File);

      alert(`✅ Certificate "${file.name}" uploaded for Batch ${batchId}`);
    } catch (error) {
      console.error("❌ File conversion failed:", error);
    }
  };

  // Retrieve certificate (for viewing)
  const getCertificate = (batchId) => {
    return localStorage.getItem(`certificate_${batchId}`);
  };

  // Handle viewing certificate
  const handleViewCertificate = (batchId) => {
    const cert = getCertificate(batchId);
    if (cert) {
      // Open certificate in new tab (works for PDF/image)
      const newWindow = window.open();
      newWindow.document.write(
        `<iframe src="${cert}" width="100%" height="100%"></iframe>`
      );
    } else {
      alert("⚠️ No certificate uploaded for this batch.");
    }
  };

  // Filter batches by search term
  const filteredBatches = batches.filter((batch) =>
    batch.batchId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>ASHVINI LABORATORY</h2>
      <p>
        New Notifications/Alerts: • Batch #A12 awaiting test results • Certificates for
        batch #B05 rejected • 3 new batches assigned to you
      </p>

      <h3>Attach Certificates / Validation Status</h3>

      <input
        type="text"
        placeholder="Enter Batch ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>HERB NAME</th>
            <th>Batch ID</th>
            <th>ATTACH CERTIFICATE</th>
            <th>VALIDATION STATUS (PENDING/APPROVED)</th>
          </tr>
        </thead>
        <tbody>
          {filteredBatches.map((batch, index) => (
            <tr key={batch.id}>
              <td>{index + 1}</td>
              <td>{batch.herbName}</td>
              <td>{batch.batchId}</td>
              <td>
                {batch.status === "PENDING" ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => handleAttachCertificate(e, batch.batchId)}
                      style={{ display: "none" }}
                      id={`file-upload-${batch.batchId}`}
                    />
                    <label htmlFor={`file-upload-${batch.batchId}`}>
                      <button>Attach Certificate</button>
                    </label>
                  </>
                ) : (
                  <button onClick={() => handleViewCertificate(batch.batchId)}>
                    View Certificate
                  </button>
                )}
              </td>
              <td>{batch.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificateTable;
