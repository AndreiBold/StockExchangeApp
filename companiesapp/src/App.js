import "./App.css";
import Dropdown from "./Dropdown";
import stockMarket from "./images/stock-market.png";
import { FaBolt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import StocksLineChart from "./StocksLineChart";

function App() {
  const [options, setOptions] = useState([]);
  const [selectedCompanyData, setSelectedCompanyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("https://stock-exchange-app.onrender.com/companies");
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCompanies();
  }, []);

  const fetchCompanyData = async (companyName) => {
    try {
      console.log("selected: " + companyName);
      const response = await axios.get(
        `https://stock-exchange-app.onrender.com/companies/stocks/${companyName}`
      );
      const companyData = response.data.dataset_data.data;
      setSelectedCompanyData(companyData);
      setError(null); // Clear any previous error message if successful
    } catch (error) {
      console.error("Error:", error);
      setError(
        `Failed to fetch stock data about ${companyName} from Nasdaq API`
      );
    }
  };

  return (
    <div className="App">
      <div className="header">
        <img
          className="app-brand"
          alt="App brand"
          src={stockMarket}
          width="30px"
          height="30px"
        />
        <div className="greet-message">
          <span>
            Welcome! Find real time stock data about top companies <FaBolt />
          </span>
        </div>
        <div className="dropdown-area">
          <Dropdown
            options={options}
            onSelect={(selectedCompany) => {
              fetchCompanyData(selectedCompany);
            }}
          />
        </div>
      </div>

      <div className="chart-container">
        <span className="info-msg">Entire data history of open, close high and low prices along with the volumes</span>
          {error && <p>{error}</p>}
          {selectedCompanyData.length > 0 ? (
            <StocksLineChart data={selectedCompanyData} />
          ) : (
            <p>No data available for the selected company</p>
          )}
      </div>
    </div>
  );
}

export default App;
