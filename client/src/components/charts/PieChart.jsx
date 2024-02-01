import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, isDarkMode }) => {
  useEffect(() => {
    // Get the canvas element
    const pieChartCanvas = document.getElementById('transactionPieChart');

    // Check if the canvas element exists
    if (!pieChartCanvas) {
      // Log an error if the canvas element is not found
      console.error('pieChartCanvas element not found');
      return;
    }

    // Destroy existing chart instance to prevent duplicates
    if (window.pieChart) {
      window.pieChart.destroy();
    }

    // Get the 2D rendering context for the canvas
    const ctx = pieChartCanvas.getContext('2d');

    // Process transactions to separate withdrawals and deposits
    const withdrawals = [];
    const deposits = [];

    data.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.direction === 'debit') {
        withdrawals.push(amount);
      } else {
        deposits.push(amount);
      }
    });

    // Create the pie chart data
    const chartData = {
      labels: ['Outgoing', 'Incoming'],
      datasets: [
        {
          label: 'All Transactions',
          data: [withdrawals.reduce((a, b) => a + b, 0), deposits.reduce((a, b) => a + b, 0)],
          backgroundColor: [
            isDarkMode ? 'rgba(255, 99, 132, 0.7)' : 'rgba(255, 99, 132, 0.7)',
            isDarkMode ? 'rgba(75, 192, 192, 0.7)' : 'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            isDarkMode ? 'rgba(255, 99, 132, 0.1)' : 'rgba(255, 99, 132, 0.1)',
            isDarkMode ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 0.5)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Configure chart options
    const options = {};

    // Create a new pie chart instance
    window.pieChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: options,
    });
  }, [data, isDarkMode]);

  // Render the canvas element for the chart
  return <canvas id="transactionPieChart" width="300" height="200"></canvas>;
};

export default PieChart;
