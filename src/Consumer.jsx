import React, { useState } from "react";
import {
  Search,
  QrCode,
  Leaf,
  Factory,
  FlaskConical,
  Package,
  XCircle,
  CheckCircle,
} from "lucide-react";

export default function Consumer() {
  // Modal & toggle states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showGrowerModal, setShowGrowerModal] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  // Search + Product
  const [searchCode, setSearchCode] = useState("");
  const [product, setProduct] = useState(null);

  const handleSearch = () => {
    // Mock product data - Replace with API later
    setProduct({
      name: "Ashwagandha Root Powder",
      batch: "B7-34A91",
      origin: "Wardha, Maharashtra",
      harvested: "Aug 12, 2025",
      certification: "Certified Organic",
      gps: "28.7041° N, 77.1025° E | Delhi, India",
      growerGroup: "Adarsh Farming Cooperative",
      growerLeader: "Ramesh Patel",
      processing: [
        { step: "Sun-Dried", date: "Aug 14, 2025" },
        { step: "Hand-Ground", date: "Aug 16, 2025" },
        { step: "Climate-Controlled Storage", date: "Aug 18, 2025" },
      ],
      tests: {
        pesticide: "Passed",
        heavyMetal: "Passed",
        dna: "View Certificate",
      },
      packagedOn: "Sep 05, 2025",
      expiresOn: "Sep 05, 2027",
      hash: "0x1A2b3C4d56Ef7A8b9C0d1E2f3A4b56Cd7E8f9A0b",
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAF5] text-gray-800">
      {/* Header */}
      <header className="bg-[#B5E89B] flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-green-900">ASHVINI–CONSUMER</h1>
        <div className="bg-white px-4 py-1 rounded-full shadow text-sm font-medium">
          USER_NAME &nbsp; | &nbsp; CONSUMER_ID
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-6 px-4">
        <h2 className="text-2xl font-semibold italic text-green-900">
          Discover Your Herb's Journey 🌿
        </h2>
        <p className="text-sm mt-2 text-gray-700">
          From farm to shelf, trace the complete story of your herbal products.
          Verify authenticity, check quality certificates, and meet the farmers
          who grew your herbs.
        </p>
      </section>

      {/* Search + QR */}
      {!product && (
        <section className="flex flex-col md:flex-row justify-center items-center gap-6 px-6">
          {/* QR */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-sm mb-3">Ready to verify your herbal product?</p>
            <QrCode className="mx-auto w-20 h-20 text-green-800" />
            <button className="mt-3 bg-green-900 text-white px-4 py-2 rounded-full text-sm">
              SCAN QR CODE
            </button>
          </div>

          {/* Search */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 w-full md:w-1/2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter product code to search"
                className="flex-1 border px-3 py-2 rounded-lg"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-1" /> Search
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Product Results */}
      {product && (
        <section className="mt-8 px-6 space-y-8">
          {/* Product Info */}
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-green-900">{product.name}</h3>
            <p className="text-sm">Batch ID: {product.batch}</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="mt-3 bg-black text-white px-4 py-2 rounded text-sm"
            >
              Blockchain Verified
            </button>
          </div>

          {/* Journey */}
          <div className="space-y-6">
            {/* Harvest */}
            <div className="bg-green-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-green-900 flex items-center">
                The Source (Harvest) <Leaf className="ml-2 w-4 h-4" />
              </h4>
              <p className="text-sm mt-2">
                Harvested from certified organic farms where sustainable
                practices are followed.
              </p>
              <p className="mt-2 text-sm text-gray-600">📍 {product.gps}</p>
              <button
                onClick={() => setShowGrowerModal(true)}
                className="mt-3 bg-green-900 text-white px-4 py-2 rounded text-sm"
              >
                Meet The Growers
              </button>
            </div>

            {/* Processing */}
            <div className="bg-green-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-green-900 flex items-center">
                The Craft (Processing) <Factory className="ml-2 w-4 h-4" />
              </h4>
              <p className="text-sm mt-2">
                Processed at our GMP-certified facility to ensure purity and
                potency.
              </p>
              <button
                onClick={() => setShowProcessing(!showProcessing)}
                className="mt-3 bg-green-900 text-white px-4 py-2 rounded text-sm"
              >
                {showProcessing ? "Hide Processing Steps" : "Show Processing Steps"}
              </button>
              {showProcessing && (
                <ul className="mt-3 text-sm list-disc list-inside">
                  {product.processing.map((step, i) => (
                    <li key={i}>
                      {step.step} – {step.date}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Lab Tests */}
            <div className="bg-green-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-green-900 flex items-center">
                The Proof (Laboratory Testing){" "}
                <FlaskConical className="ml-2 w-4 h-4" />
              </h4>
              <ul className="mt-3 text-sm space-y-1">
                <li>✅ Pesticide Analysis – {product.tests.pesticide}</li>
                <li>✅ Heavy Metal Screen – {product.tests.heavyMetal}</li>
                <li>
                  🧬 DNA Barcoding –{" "}
                  <button className="underline text-green-900">
                    {product.tests.dna}
                  </button>
                </li>
              </ul>
            </div>

            {/* Packaging */}
            <div className="bg-green-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-green-900 flex items-center">
                The Proof (Packaging) <Package className="ml-2 w-4 h-4" />
              </h4>
              <p className="text-sm mt-2">
                📦 Packaged on: {product.packagedOn}
              </p>
              <p className="text-sm">⏳ Expires on: {product.expiresOn}</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#B5E89B] text-center py-6 mt-12">
        <h4 className="font-bold text-green-900">ASHVINI</h4>
        <p className="text-sm text-gray-700">Seed to Scan. Pure & Proven.</p>
      </footer>

      {/* Blockchain Modal */}
      {showAuthModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h4 className="font-bold flex items-center justify-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" /> Blockchain Verified
            </h4>
            <p className="text-sm mt-2">
              This product’s authenticity has been recorded on an immutable
              ledger.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              <strong>Transaction Hash:</strong> {product.hash}
            </p>
            <button className="mt-3 bg-gray-800 text-white px-4 py-2 rounded text-sm">
              View on Explorer
            </button>
            <button
              onClick={() => setShowAuthModal(false)}
              className="mt-2 flex items-center justify-center text-red-600"
            >
              <XCircle className="w-4 h-4 mr-1" /> Close
            </button>
          </div>
        </div>
      )}

      {/* Grower Modal */}
      {showGrowerModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h4 className="font-bold text-green-900">👨‍🌾 Meet the Growers</h4>
            <p className="text-sm mt-2">
              This herb was cultivated by the{" "}
              <b>{product.growerGroup}</b> in Wardha, Maharashtra. Led by{" "}
              <b>{product.growerLeader}</b>, this group of 50+ farmers uses
              sustainable methods.
            </p>
            <button className="mt-3 bg-green-900 text-white px-4 py-2 rounded text-sm">
              View Location on Maps
            </button>
            <button
              onClick={() => setShowGrowerModal(false)}
              className="mt-2 flex items-center justify-center text-red-600"
            >
              <XCircle className="w-4 h-4 mr-1" /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  color: "black",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "450px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};
