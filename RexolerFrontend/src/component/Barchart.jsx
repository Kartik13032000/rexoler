import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedMonth, setSelectedMonth] = useState('');
  const priceRanges = [
    "0 - 100", "102 - 200", "201 - 300", "301 - 400", 
    "401 - 500", "501 - 600", "601 - 700", "701 - 800", 
    "801 - 900", "901 and above"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bar-chart?month=${selectedMonth}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Map data to ensure all price ranges have counts (including zero counts)
        const chartData = {
          labels: priceRanges,
          datasets: [
            {
              label: 'Count',
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',    // Red
                'rgba(54, 162, 235, 0.6)',    // Blue
                'rgba(255, 206, 86, 0.6)',    // Yellow
                'rgba(75, 192, 192, 0.6)',    // Green
                'rgba(153, 102, 255, 0.6)',   // Purple
                'rgba(255, 159, 64, 0.6)',    // Orange
                'rgba(255, 99, 132, 0.6)',    // Red
                'rgba(54, 162, 235, 0.6)',    // Blue
                'rgba(255, 206, 86, 0.6)',    // Yellow
                'rgba(75, 192, 192, 0.6)'     // Green
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',      // Red
                'rgba(54, 162, 235, 1)',      // Blue
                'rgba(255, 206, 86, 1)',      // Yellow
                'rgba(75, 192, 192, 1)',      // Green
                'rgba(153, 102, 255, 1)',     // Purple
                'rgba(255, 159, 64, 1)',      // Orange
                'rgba(255, 99, 132, 1)',      // Red
                'rgba(54, 162, 235, 1)',      // Blue
                'rgba(255, 206, 86, 1)',      // Yellow
                'rgba(75, 192, 192, 1)'       // Green
              ],
              borderWidth: 1,
              data: priceRanges.map(range => data[range] || 0) // Ensure zero for undefined ranges
            }
          ]
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedMonth) {
      fetchData();
    }
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="bar-chart-container" style={{margin:'50px', backgroundColor: '#FFFFFF',border:'3px solid black', borderRadius : '20px', height:'400px'  }}>
      <div className="controls">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select...</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <button onClick={() => setSelectedMonth(selectedMonth)}>Fetch Data</button>
      </div>
      <div className="chart-container">
        <div className="chart">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'category',
                  labels: priceRanges,
                  scaleLabel: {
                    display: true,
                    labelString: 'Price Range'
                  },
                  grid: {
                    offset: true // Adjusts the positioning of the grid lines
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Count'
                  }
                }
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom'
                },
                title: {
                  display: true,
                  text: 'Price Range Count',
                  fontSize: 20
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;
