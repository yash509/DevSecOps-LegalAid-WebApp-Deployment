import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Import Header component
import QueryPage from './components/QueryPage';  // Import QueryPage component
import Translate from './components/Translate';  // Import Translate component
import Welcome from './components/Welcome';  // Import Welcome component
import JudgeView from './components/JudgeView';  // Import JudgeView component
import LawyerView from './components/LawyerView';  // Import LawyerView component

const App = () => {
  return (
    <Router>
      <Header /> {/* Display the header on all pages */}
      <Routes>
        {/* Route for the home page */}
        <Route 
          path="/" 
          element={
            <div>
              <Welcome /> {/* Display Welcome component */}
              <Translate /> {/* Display Translate component */}
            </div>
          } 
        />
        {/* Route for QueryPage */}
        <Route path="/query-page" element={<QueryPage />} />

        {/* Route for JudgeView */}
        <Route path="/judge-view" element={<JudgeView />} />

        {/* Route for LawyerView */}
        <Route path="/lawyer-view" element={<LawyerView />} />
      </Routes>
    </Router>
  );
};

export default App;
