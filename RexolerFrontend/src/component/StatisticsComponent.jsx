import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatisticsComponent.css'; // Import CSS for table styling

const StatisticsComponent = () => {
    const [month, setMonth] = useState('');
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        soldItems: 0,
        unsoldItems: 0
    });

    const fetchStatistics = async (selectedMonth) => {
        try {
            const response = await axios.get(`http://localhost:8080/statistics?month=${selectedMonth}`);
            const data = response.data;
            setStatistics({
                totalSaleAmount: data[0],
                soldItems: data[1],
                unsoldItems: data[2]
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
        fetchStatistics(selectedMonth);
    };

    useEffect(() => {
        if (month) {
            fetchStatistics(month);
        }
    }, [month]);

    return (
        <div classname = "sts"style={{ margin: '50px', backgroundColor: '#7CDCE7  ',border:'3px black', borderRadius : '30px',padding:'25px' }}>
            <h2 style={{color:'blue'}}>Statistics for Selected Month</h2>
            <div>
                <label>Select Month: </label>
                <select value={month} onChange={handleMonthChange}>
                    <option value="">Select Month</option>
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
            </div>
            <div style={{border:'2px black', borderRadius:'10px'}}>
                <h3>Statistics:</h3>
                <table className="stats-table" style={{border:'2px black', borderRadius:'10px'}}>
                    <thead>
                        <tr>
                            <th>Statistic</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Sale Amount</td>
                            <td>${statistics.totalSaleAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Sold Items</td>
                            <td>{statistics.soldItems}</td>
                        </tr>
                        <tr>
                            <td>Unsold Items</td>
                            <td>{statistics.unsoldItems}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticsComponent;
