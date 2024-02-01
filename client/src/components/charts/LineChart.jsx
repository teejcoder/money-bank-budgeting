import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, isDarkMode }) => {
  useEffect(() => {
    // Get the canvas element
    const lineChartCanvas = document.getElementById('incomeExpenseLineChart');

    // Check if the canvas element exists
    if (!lineChartCanvas) {
      // Log an error if the canvas element is not found
      console.error('lineChartCanvas element not found');
      return;
    }

    // Destroy existing chart instance to prevent duplicates
    if (window.lineChart) {
      window.lineChart.destroy();
    }

    // Get the 2D rendering context for the canvas
    const ctx = lineChartCanvas.getContext('2d');

    // Process transactions to track income minus expenses by month
    const monthlyData = {};

    data.forEach((transaction) => {
      const date = new Date(transaction.postDate);
      const monthYearKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = 0;
      }
      const amount = parseFloat(transaction.amount);
      if (transaction.direction === 'credit') {
        monthlyData[monthYearKey] += amount;
      } else {
        monthlyData[monthYearKey] -= amount;
      }
    });

    // Extract months and data for the chart
    const months = Object.keys(monthlyData);
    const netIncomeData = months.map((key) => monthlyData[key]);

    // Create the line chart data
    const chartData = {
      labels: months,
      datasets: [
        {
          label: 'Net Income',
          data: netIncomeData,
          fill: false,
          color: isDarkMode ? '#FBF5F3' : '#000000',
          backgroundColor: isDarkMode ? '#4BC0C0' : 'rgba(75, 192, 192, 0.7)',
          borderColor: isDarkMode ? '#4BC0C0' : 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
        },
      ],
    };

    // Configure chart options
    const options = {
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          type: 'category',
          position: 'bottom',
          title: {
            display: true,
            text: 'Month-Year',
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          grid: {
            color: isDarkMode ? '#BABABA' : '#e0e0e0',
          },
        },
        y: {
          ticks: {
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Net Income',
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          grid: {
            color: isDarkMode ? '#BABABA' : '#e0e0e0',
          },
        },
      },
    };

    // Create a new line chart instance
    window.lineChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options,
    });
  }, [data, isDarkMode]);

  // Render the canvas element for the chart
  return <canvas id="incomeExpenseLineChart" width="400" height="300"></canvas>;
};

export default LineChart;