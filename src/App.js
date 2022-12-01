import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logs from "./containers/logs";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/logger" />} />
          <Route exact path="/logger" element={<Logs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
