// components/ChartComponent.jsx
import { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ Register all required components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartComponent() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar', // ✅ bar controller now properly registered
      data: {
        labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10', 'Jun 11', 'Jun 12', 'Jun 13', 'Jun 14'],
        datasets: [
          {
            label: 'Positive Reviews (%)',
            data: [80, 70, 85, 60, 90, 75, 88, 77, 82, 85, 73, 80, 70, 68],
            backgroundColor: '#1D60A6',
            stack: 'reviews'
          },
          {
            label: 'Negative Reviews (%)',
            data: [20, 30, 15, 40, 10, 25, 12, 23, 18, 15, 27, 20, 30, 32],
            backgroundColor: '#FFBE33',
            stack: 'reviews'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}%`;
              }
            }
          },
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            max: 100,
            stacked: true,
            title: {
              display: true,
              text: 'Total reviews'
            },
            grid: {
              display: true
            }
          },
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Date'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className="col-md-12">
      <div className="bar-chart-bg">
        <div className="card-body">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
