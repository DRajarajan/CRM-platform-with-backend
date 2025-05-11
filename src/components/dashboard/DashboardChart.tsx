import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  // Last 7 days
  const labels = [
    'April 10',
    'April 11',
    'April 12',
    'April 13', 
    'April 14',
    'April 15',
    'April 16',
  ];

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Delivery Rate',
        data: [96.2, 95.8, 94.9, 97.1, 96.5, 98.2, 97.8],
        borderColor: '#0d9488', // teal-600
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Engagement Rate',
        data: [42.5, 43.1, 41.8, 45.2, 44.5, 47.1, 46.3],
        borderColor: '#f97316', // accent-500
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 40,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: '#f3f4f6',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 3,
      }
    },
  };

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardChart;