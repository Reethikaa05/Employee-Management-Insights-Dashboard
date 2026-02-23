import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { ArrowLeft, LogOut } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartsView = ({ data, onLogout }) => {
    const navigate = useNavigate();

    // Get first 10 employees
    const firstTen = data.slice(0, 10);

    const chartData = {
        labels: firstTen.map(emp => emp.name),
        datasets: [
            {
                label: 'Salary ($)',
                data: firstTen.map(emp => emp.salaryValue),
                backgroundColor: 'rgba(99, 102, 241, 0.6)',
                borderColor: '#6366f1',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(99, 102, 241, 0.8)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#94a3b8' }
            },
            title: {
                display: true,
                text: 'Top 10 Employee Salaries',
                color: '#f8fafc',
                font: { size: 20 }
            },
        },
        scales: {
            y: {
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            x: {
                ticks: { color: '#94a3b8' },
                grid: { display: false }
            }
        }
    };

    return (
        <div className="container animate-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => navigate('/list')} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <button onClick={onLogout} className="btn-primary" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ChartsView;
