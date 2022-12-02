import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
const Logs = React.lazy(() => import('./containers/logs'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading application...</div>}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate to="/logger" />} />
            <Route exact path="/logger" element={<Logs />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
