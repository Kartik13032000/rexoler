import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionsTable.css';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions(selectedMonth);
  }, [selectedMonth, currentPage]); // Fetch transactions when month or page changes

  const fetchTransactions = async (month) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${month}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchTransactions(selectedMonth);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/products/${searchText}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error searching transactions:', error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container" style={{margin:'50px', backgroundColor: '#7CDCE7 ',border:'3px black', borderRadius : '20px', }}>
      <div className="select-container">
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Transactions"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} style={{ width: '100px', height: 'auto' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
