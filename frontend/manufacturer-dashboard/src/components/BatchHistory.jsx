import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./BatchHistory.css"; // For modal + flash animation styles

const BatchHistory = () => {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showQR, setShowQR] = useState(false);
   /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.example.com/manufacturer/dashboard");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching manufacturer data:", error);
      }
    };
    fetchData();
  }, []);
  */

  // Hardcoded batch history data
  const batchData = [
    { id: "F89021", herb: "Ashwagandha", date: "19/09/25", status: "PENDING" },
    { id: "G45678", herb: "Shatavari", date: "19/09/25", status: "APPROVED" },
    { id: "F34569", herb: "Tulsi", date: "19/09/25", status: "APPROVED" },
    { id: "D34521", herb: "Triphala", date: "19/09/25", status: "PENDING" },
    { id: "A20983", herb: "Guduchi", date: "19/09/25", status: "APPROVED" },
    { id: "F56723", herb: "Neem", date: "19/09/25", status: "PENDING" },
    { id: "H23439", herb: "Brahmi", date: "19/09/25", status: "APPROVED" },
  ];

  // Hardcoded provenance data for demo
  const provenanceData = {
    collector: {
      id: "FARMER-V012",
      location: "19.8762° N, 75.3433° E",
      date: "2025-08-15",
      blockchain: "0xabc...123",
    },
    processor: {
      id: "PROC-MUM-03",
      method: "Sun-dried, Machine Ground",
      date: "2025-08-20",
      blockchain: "0xdef...456",
    },
    lab: {
      id: "LAB-PUNE-01",
      report: "CERT-5591-A",
      results:
        "Moisture < 8%, Pesticide below threshold, DNA Barcode: Authenticated.",
      date: "2025-08-25",
      blockchain: "0xghi...789",
    },
  };

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
    setShowQR(false);
  };

  const handleGenerateQR = () => {
    setShowQR(true);
  };

  const handleClose = () => {
    setSelectedBatch(null);
    setShowQR(false);
  };

  return (
    <div className="batch-history-container">
      <button className="dashboard" onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>

      <h2>Batch Status And History</h2>
      <table className="batch-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>HERB NAME</th>
            <th>Batch ID</th>
            <th>SUBMITTED ON</th>
            <th>CURRENT STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {batchData.map((batch, index) => (
            <tr key={batch.id}>
              <td>{index + 1}</td>
              <td>{batch.herb}</td>
              <td>
                <button
                  className="batch-id"
                  onClick={() => handleBatchClick(batch)}
                >
                  {batch.id}
                </button>
              </td>
              <td>{batch.date}</td>
              <td
                className={batch.status === "APPROVED" ? "approved" : "pending"}
              >
                {batch.status}
              </td>
              <td>
                {batch.status === "APPROVED" ? (
                  <button className="download">Download</button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Provenance / QR */}
      {selectedBatch && (
        <div className="modal flash">
          <div className="modal-content">
            <button className="close" onClick={handleClose}>
              ✖
            </button>

            {!showQR ? (
              <>
                <h3>Provenance for Batch: {selectedBatch.id}</h3>
                <div className="provenance-section">
                  <p>
                    <strong>📍 Collection Event</strong>
                    <br />
                    Collector: {provenanceData.collector.id}
                    <br />
                    Location: {provenanceData.collector.location}
                    <br />
                    Date: {provenanceData.collector.date}
                    <br />
                    Blockchain TX: {provenanceData.collector.blockchain}
                  </p>

                  <p>
                    <strong>⚙️ Processing Step</strong>
                    <br />
                    Processor: {provenanceData.processor.id}
                    <br />
                    Method: {provenanceData.processor.method}
                    <br />
                    Date: {provenanceData.processor.date}
                    <br />
                    Blockchain TX: {provenanceData.processor.blockchain}
                  </p>

                  <p>
                    <strong>🧪 Laboratory Test</strong>
                    <br />
                    Lab: {provenanceData.lab.id}
                    <br />
                    Report ID: {provenanceData.lab.report}
                    <br />
                    Results: {provenanceData.lab.results}
                    <br />
                    Date: {provenanceData.lab.date}
                    <br />
                    Blockchain TX: {provenanceData.lab.blockchain}
                  </p>
                </div>
                <button className="generate-btn" onClick={handleGenerateQR}>
                  GENERATE QR
                </button>
              </>
            ) : (
              <>
                <h3>PRODUCT QR GENERATED</h3>
                <QRCode value={`Batch ID: ${selectedBatch.id}`} size={150} />
                <p className="batch-label">Batch ID: {selectedBatch.id}</p>
                <p>This QR code is ready for printing on the product package.</p>
                <button className="download">Download QR</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchHistory;
