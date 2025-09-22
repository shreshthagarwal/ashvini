import React from 'react';
import { Link , useNavigate} from 'react-router-dom';

function Portal() {
  return (
    <div className="portal-container">
      <div className="portal-header">
        <h1>ASHVINI</h1>
        <p>From Farm to Consumer - Every Step Verified</p>
      </div>

      <h2 className="role-selection-heading">
        Select your role in the herbal supply chain to access your personalized dashboard
      </h2>

      <div className="role-blocks-container">
        <Link to="/farmer" className="role-block">
          <div className="role-icon"></div>
          <h3>Farmer/Collector</h3>
          <p>Record both collective harvests, harvest locations, and herbal quality metrics</p>
        </Link>

        <Link to="/processor" className="role-block">
          <div className="role-icon"></div>
          <h3>Processor</h3>
          <p>Track processing steps, drying, grinding, and storage conditions</p>
        </Link>

        <Link to="/lab" className="role-block">
          <div className="role-icon"></div>
          <h3>Testing Laboratory</h3>
          <p>Upload quality test results, certifications, and analysis reports</p>
        </Link>

        <Link to="/manufacturer" className="role-block">
          <div className="role-icon"></div>
          <h3>Manufacturer</h3>
          <p>Generate QR codes for final packaging and product certifications</p>
        </Link>

        <Link to="/consumer" className="role-block">
          <div className="role-icon"></div>
          <h3>Consumer</h3>
          <p>Scan the QR code on your herbal product to view its complete journey</p>
        </Link>
      </div>
    </div>
  );
}

export default Portal;
