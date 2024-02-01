import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ data, isDarkMode }) => {
  useEffect(() => {
    // Get the canvas element
    const doughnutChartCanvas = document.getElementById('expenseDoughnutChart');

    // Check if the canvas element exists
    if (!doughnutChartCanvas) {
      // Log an error if the canvas element is not found
      console.error('doughnutChartCanvas element not found');
      return;
    }

    // Destroy existing chart instance to prevent duplicates
    if (window.doughnutChart) {
      window.doughnutChart.destroy();
    }

    // Get the 2D rendering context for the canvas
    const ctx = doughnutChartCanvas.getContext('2d');

    // Get top expenses
    const topExpenses = data
      .filter(transaction => parseFloat(transaction.amount) < 0) // Consider only debit transactions (expenses)
      .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)) // Sort by amount in ascending order
      .slice(0, 5); // Take the top 5 expenses

    // Extract labels and data for the chart
    const expenseLabels = topExpenses.map(expense => expense.subClass.title);
    const expenseData = topExpenses.map(expense => expense.amount);

    // Create the doughnut chart data
    const chartData = {
      labels: expenseLabels,
      datasets: [
        {
          data: expenseData,
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    // Configure chart options
    const options = {
      tooltips: {
        position: 'nearest', // or 'nearest', 'average', etc.
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Top 5 Expenses',
          color: isDarkMode ? '#BABABA' : '#6C6B6B',
        },
      },
    };

    // Create a new doughnut chart instance
    window.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: options,
    });
  }, [data, isDarkMode]);

  // Render the canvas element for the chart
  return <canvas id="expenseDoughnutChart" width="400" height="300"></canvas>;
};

export default DoughnutChart;
