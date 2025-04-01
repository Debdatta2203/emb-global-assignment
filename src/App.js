import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Instructions from './pages/Instructions';
import ComplaintType from './pages/ComplaintType';
import ComplaintForm from './pages/ComplaintForm';
import './App.css';

function App() {
  // states
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/complaint_type" element={
              <ComplaintType 
                selectedComplaintType={selectedComplaintType}
                setSelectedComplaintType={setSelectedComplaintType}
              />
            } 
          />
          <Route 
            path="/complainant_information" 
            element={<ComplaintForm selectedComplaintType={selectedComplaintType} />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
