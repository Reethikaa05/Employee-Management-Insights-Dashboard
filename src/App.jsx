import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ListPage from './components/ListPage';
import DetailsPage from './components/DetailsPage';
import PhotoResultPage from './components/PhotoResultPage';
import ChartsView from './components/ChartsView';
import MapView from './components/MapView';

function App() {
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeePhotos, setEmployeePhotos] = useState({});

  const handleLogout = () => {
    setUser(null);
    setTableData([]);
    setSelectedItem(null);
    setEmployeePhotos({});
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={setUser} />}
        />
        <Route
          path="/list"
          element={user ? <ListPage setTableData={setTableData} setSelectedItem={setSelectedItem} onLogout={handleLogout} photos={employeePhotos} /> : <Navigate to="/login" />}
        />
        <Route
          path="/details"
          element={selectedItem ? <DetailsPage item={selectedItem} photos={employeePhotos} setEmployeePhotos={setEmployeePhotos} onLogout={handleLogout} /> : <Navigate to="/list" />}
        />
        <Route
          path="/photo-result"
          element={selectedItem && employeePhotos[selectedItem.id] ? <PhotoResultPage photo={employeePhotos[selectedItem.id]} onLogout={handleLogout} /> : <Navigate to="/list" />}
        />
        <Route
          path="/charts"
          element={tableData.length > 0 ? <ChartsView data={tableData} onLogout={handleLogout} /> : <Navigate to="/list" />}
        />
        <Route
          path="/map"
          element={tableData.length > 0 ? <MapView data={tableData} onLogout={handleLogout} /> : <Navigate to="/list" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
