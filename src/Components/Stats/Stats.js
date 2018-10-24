import React from "react";
import "./Stats.scss";

const Stats = ({ stats, inventory }) => {
  return (
    <div className="stats-display">
      <div className="stat-list">
        <h3>Stats</h3>
        <p className="stat">
          <span className="stat-title">Health:</span> {stats.currentHp}/
          {stats.maxHp}
        </p>
        <p className="stat">
          <span className="stat-title">Defense:</span> {stats.def}
        </p>
        <p className="stat">
          <span className="stat-title">Strength:</span> {stats.str}
        </p>
        <p className="stat">
          <span className="stat-title">Dexerity:</span> {stats.dex}
        </p>
        <p className="stat">
          <span className="stat-title">Luck:</span> {stats.lck}
        </p>
        <p className="stat">
          <span className="stat-title">Appearence:</span> {stats.appr}
        </p>
        <p className="stat">
          <span className="stat-title">Gold:</span> {stats.money}
        </p>
      </div>

      <div className="inventory">
        <h3>Inventory</h3>
        {inventory.map(item => {
          return <p className="item">{item}</p>;
        })}
      </div>
    </div>
  );
};

export default Stats;
