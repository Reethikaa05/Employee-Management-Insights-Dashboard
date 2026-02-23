import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Home, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PhotoResultPage = ({ photo }) => {
    const navigate = useNavigate();

    return (
        <div className="container animate-fade" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#10b981' }}>
                    <CheckCircle size={32} />
                    <h1 style={{ fontSize: '2.5rem' }}>Capture Successful</h1>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>The biometric data has been processed and saved to your profile.</p>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card"
                    style={{ padding: '1rem', marginBottom: '3rem', position: 'relative' }}
                >
                    <img
                        src={photo}
                        alt="Captured"
                        style={{ width: '100%', borderRadius: '1rem', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(16, 185, 129, 0.9)', color: 'white', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        VERIFIED
                    </div>
                </motion.div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/list')} className="btn-primary">
                        <Home size={18} /> Back to Dashboard
                    </button>
                    <button onClick={() => navigate('/details')} className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                        <RefreshCw size={18} /> Retake Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoResultPage;
