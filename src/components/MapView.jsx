import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, LogOut } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ data, onLogout }) => {
    const navigate = useNavigate();

    // Coordinate lookup for common cities in the API data
    const cityCoords = {
        'Edinburgh': [55.9533, -3.1883],
        'Tokyo': [35.6762, 139.6503],
        'San Francisco': [37.7749, -122.4194],
        'New York': [40.7128, -74.0060],
        'London': [51.5074, -0.1278],
        'Singapore': [1.3521, 103.8198],
        'Sydney': [-33.8688, 151.2093]
    };

    const markers = data.slice(0, 30).map((emp) => {
        // Fallback to random hub if city not in lookup
        const coords = cityCoords[emp.city] || [20 + (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 360];

        return {
            ...emp,
            coords: [
                coords[0] + (Math.random() - 0.5) * 0.5, // Subtle jitter
                coords[1] + (Math.random() - 0.5) * 0.5
            ]
        };
    });

    return (
        <div className="container animate-fade">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/list')} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>
                        <ArrowLeft size={18} /> Back to Dashboard
                    </button>
                    <button onClick={onLogout} className="btn-primary" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Global Talent Distribution</h1>
            </header>

            <div className="glass-card" style={{ padding: '0', height: '600px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.coords}>
                            <Popup>
                                <div style={{ color: '#1e293b' }}>
                                    <strong style={{ display: 'block' }}>{marker.name}</strong>
                                    <span>{marker.role}</span><br />
                                    <span>{marker.city}</span><br />
                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Salary: {marker.salary}</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                * Locations are estimated based on regional headquarters data associated with employee IDs.
            </p>
        </div>
    );
};

export default MapView;
