import React, { useState, useEffect } from "react";

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
  const [selectedFile, setSelectedFile] = useState(null);

  // Example API fetch (commented out)
  /*
  useEffect(() => {
    fetch("https://api.example.com/batches")
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch((err) => console.error(err));
  }, []);
  */

  const handleFileChange = (e, batchId) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      alert(`Certificate "${file.name}" attached for Batch ${batchId}`);
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
                      onChange={(e) => handleFileChange(e, batch.batchId)}
                      style={{ display: "none" }}
                      id={`file-upload-${batch.batchId}`}
                    />
                    <label htmlFor={`file-upload-${batch.batchId}`}>
                      <button>Attach Certificate</button>
                    </label>
                  </>
                ) : (
                  <button onClick={() => alert("Viewing certificate")}>
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
