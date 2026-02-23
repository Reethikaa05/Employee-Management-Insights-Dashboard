import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Table, BarChart2, Map as MapIcon, ChevronRight, Loader2, LogOut } from 'lucide-react';

const ListPage = ({ setTableData, setSelectedItem, onLogout, photos = {} }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Using text/plain to avoid CORS preflight OPTIONS request
                const response = await axios.post('https://backend.jotish.in/backend_dev/gettabledata.php',
                    JSON.stringify({
                        username: "test",
                        password: "123456"
                    }),
                    {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    }
                );

                // The structure is {"TABLE_DATA": {"data": [[...], [...]]}}
                const result = response.data.TABLE_DATA?.data || [];

                // Map the array data to objects for easier use
                const formattedData = result.map((item, index) => ({
                    id: index + 1,
                    name: item[0],
                    role: item[1],
                    city: item[2],
                    idCode: item[3],
                    date: item[4],
                    salary: item[5],
                    salaryValue: parseFloat(item[5].replace(/[$,]/g, '')) || 0
                }));

                setData(formattedData);
                setTableData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, [setTableData]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        navigate('/details');
    };

    if (loading) {
        return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                <p style={{ color: 'var(--text-muted)' }}>Fetching premium data...</p>
            </div>
        );
    }

    return (
        <div className="container animate-fade">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Data Insights
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Showing {data.length} records found in system</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/charts')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                        <BarChart2 size={18} /> Charts
                    </button>
                    <button onClick={() => navigate('/map')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                        <MapIcon size={18} /> Map
                    </button>
                    <button onClick={onLogout} className="btn-primary" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            {error ? (
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>{error}</div>
            ) : (
                <div className="grid-layout">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02, translateY: -5 }}
                            className="glass-card"
                            style={{ padding: '1.5rem', cursor: 'pointer', border: photos[item.id] ? '1px solid #10b981' : '1px solid var(--border)' }}
                            onClick={() => handleItemClick(item)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.name || 'N/A'}</h3>
                                        {photos[item.id] && <div style={{ background: '#10b981', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '4px', height: '8px', borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginBottom: '2px' }}></div>
                                        </div>}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{item.role || 'N/A'}</p>
                                    <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1rem', marginTop: '0.5rem' }}>{item.salary || 'N/A'}</p>
                                </div>
                                <div style={{ background: photos[item.id] ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', padding: '8px', borderRadius: '12px' }}>
                                    <ChevronRight size={20} color={photos[item.id] ? '#10b981' : "var(--primary)"} />
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>City: {item.city || 'N/A'}</span>
                                <span>Date: {item.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListPage;
