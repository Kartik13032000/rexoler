import logo from './logo.svg';
import './App.css';
import BarChart from './component/Barchart';
import StatisticsComponent from './component/StatisticsComponent';
import TransactionsTable from './component/TransactionsTable';

function App() {
  return (
    <div className="App" style={{background:'#F7BD92  '}}>
       <BarChart/>
       <StatisticsComponent/>
       <TransactionsTable/>
    </div>
  );
}

export default App;
