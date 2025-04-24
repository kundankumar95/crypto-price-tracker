import React, { useState } from "react";
import "./Table.css";
import { useSelector } from "react-redux";

const Table = () => {
  const assets = useSelector((state) => state.crypto);
  const [selectedChart, setSelectedChart] = useState(null);

  const colorClass = (value) =>
    value > 0 ? "green" : value < 0 ? "red" : "black";

  const handleChartClick = (chart) => {
    setSelectedChart(chart);
  };

  const closeChart = () => {
    setSelectedChart(null);
  };

  return (
    <div className="table-container">
      <table className="crypto-table no-border">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, idx) => (
            <tr key={asset.id}>
              <td>{idx + 1}</td>
              <td className="name-cell">
                <img
                  src={asset.logo}
                  alt={asset.symbol}
                  width="20"
                  height="20"
                  style={{ marginRight: "8px" }}
                />
                <span>{asset.name}</span>
                <span style={{ marginLeft: "4px", color: "#888" }}>
                  ({asset.symbol})
                </span>
              </td>
              <td>{asset.price}</td>
              <td className={colorClass(asset.percentChange1h)}>
                {asset.percentChange1h}%
              </td>
              <td className={colorClass(asset.percentChange24h)}>
                {asset.percentChange24h}%
              </td>
              <td className={colorClass(asset.percentChange7d)}>
                {asset.percentChange7d}%
              </td>
              <td>{asset.marketCap}</td>
              <td>{asset.volume24h}</td>
              <td>{asset.circulatingSupply}</td>
              <td>
                <img
                  src={asset.graph} 
                  alt="View Chart"
                  className="chart-img"
                  onClick={() => handleChartClick(asset.chart)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedChart && (
        <div className="chart-modal" onClick={closeChart}>
          <div className="chart-modal-content">
            <span className="chart-close" onClick={closeChart}>
              &times;
            </span>
            <img
              src={selectedChart}
              alt="7D Chart"
              className="chart-fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
