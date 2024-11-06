import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import { useDarkMode } from '../contexts/DarkModeContext';
import Button from './Button';
import Spinner from './Spinner'
import LineChart from './charts/LineChart';
import DoughnutChart from './charts/DoughnutChart';

const Bankcard = () => {
  const { isDarkMode } = useDarkMode();
  const [showSpinner, setShowSpinner] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  useEffect(() => {
    // When transactions change, update charts and totals
      if (transactions && transactions.length > 0) {
        destroyCharts();
        calculateTotalBalance();
        calculateTotalDebits();
      }
    }, [transactions]);
    
  const destroyCharts = () => {
    // Destroy existing chart instances to prevent duplicates
    ['pieChart', 'barChart', 'lineChart', 'doughnutChart'].forEach(chartName => {
      if (window[chartName]) {
        window[chartName].destroy();
      }
    });
  };

  // Fetch transactions from the server
  const getTransactions = async () => {
    try {
      setShowSpinner(true);

      // Simulate delay for user experience
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Fetch transactions using axios
      const response = await axios.post('/api/executeFlow');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setShowSpinner(false); // Hide the spinner after the fetch is complete
    }
  };

  // Calculate the total balance (credit minus debit)
  const calculateTotalBalance = () => {
    const balance = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.direction === 'debit' ? acc - amount : acc + amount;
    }, 0);
    setTotalBalance(parseFloat(balance.toFixed(2)));
  }

  // Calculate the total debit amount
  const calculateTotalDebits = () => {
    const debits = transactions.filter((transaction) => transaction.direction === 'debit');
    const totalDebits = debits.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      return acc + amount;
    }, 0);
    setTotalDebit(parseFloat(totalDebits.toFixed(2)));
  }

  return (
    <div className={`flex w-full justify-center items-center flex-col ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
        <div className='text-center pt-10'><p><i>This is test data for example purposes.</i></p>
          <div className='xl:flex items-center justify-center flex-col md:flex-row mt-10 mb-10'>
            
            {/* BAR CHART & TOTAL BALANCE*/}
            <div className='text-center p-5 chart-container'>
              <h2 className='text-5xl text-blue-600'>{transactions.length}</h2>
              <span className='text-gray-400 text-sm'>Number of Transactions</span>
              <h2 className='text-5xl text-green-600'>${totalBalance}</h2>
              <span className='text-gray-400 text-sm'>Available</span>
              <h3 className='mt-10'>Monthly Income v Expenses</h3>
              <BarChart data={transactions} isDarkMode={isDarkMode} />
            </div>

            <div className='flex justify-center items-center flex-col'>

              {/* PIE CHART */}
              <div className='text-center chart-container'> 
                <h3>Income v Expenses</h3>
                <PieChart data={transactions} isDarkMode={isDarkMode} />
              </div>

              {/* DOUGHNUT CHART */}
              <div className='text-center chart-container pb-2'> 
              <DoughnutChart data={transactions} isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* LINE CHART */}
            <div className='text-center p-5 chart-container'>
              <h2 className='text-5xl text-red-600'>${totalDebit}</h2>
              <span className='text-gray-400 text-sm'>Spend this Range</span> 
              <h3 className='mt-10'>Net Income Per Month</h3>
              <LineChart data={transactions} isDarkMode={isDarkMode} />
            </div>
            
          </div>
        </div>
    </div>
  );
}

export default Bankcard;
