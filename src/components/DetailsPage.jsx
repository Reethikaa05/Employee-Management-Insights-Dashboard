import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, User, Briefcase, DollarSign, Calendar, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const DetailsPage = ({ item, photos, setEmployeePhotos, onLogout }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const navigate = useNavigate();

    const [stream, setStream] = useState(null);

    const startCamera = async () => {
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(newStream);
            setCameraActive(true);
        } catch (err) {
            console.error('Camera error:', err);
            alert('Could not access camera. Please ensure permissions are granted.');
        }
    };

    React.useEffect(() => {
        if (cameraActive && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraActive, stream]);

    const capturePhoto = () => {
        if (!videoRef.current) return;

        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const photoData = canvasRef.current.toDataURL('image/png');

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        setEmployeePhotos(prev => ({ ...prev, [item.id]: photoData }));
        navigate('/photo-result');
    };

    return (
        <div className="container animate-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => navigate('/list')} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>
                    <ArrowLeft size={18} /> Back to List
                </button>
                <button onClick={onLogout} className="btn-primary" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="glass-card" style={{ padding: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Employee Details</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <DetailItem icon={<User size={20} />} label="Full Name" value={item.name} />
                        <DetailItem icon={<Briefcase size={20} />} label="Position" value={item.role} />
                        <DetailItem icon={<DollarSign size={20} />} label="Annual Salary" value={item.salary} />
                        <DetailItem icon={<Calendar size={20} />} label="Start Date" value={item.date} />
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <button onClick={startCamera} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            <Camera size={20} /> Initialize Identity Capture
                        </button>
                    </div>
                </motion.div>

                <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="glass-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {!cameraActive ? (
                        photos[item.id] ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                                <div style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
                                    <img src={photos[item.id]} alt="Identity" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(16, 185, 129, 0.9)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.6rem', fontWeight: 'bold' }}>
                                        SAVED IDENTITY
                                    </div>
                                </div>
                                <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>A photo is already saved for this employee.</p>
                                <button onClick={startCamera} className="btn-primary" style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}>
                                    <Camera size={18} /> Retake New Photo
                                </button>
                            </div>
                        ) : (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', padding: '2rem', textAlign: 'center' }}>
                                <Camera size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                <p>Camera inactive. Click 'Initialize Identity Capture' to start.</p>
                            </div>
                        )
                    ) : (
                        <div style={{ position: 'relative' }}>
                            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={capturePhoto}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        border: '4px solid white',
                                        background: 'rgba(255,255,255,0.3)',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '10px' }}>
            {icon}
        </div>
        <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
            <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{value || 'N/A'}</p>
        </div>
    </div>
);

export default DetailsPage;
