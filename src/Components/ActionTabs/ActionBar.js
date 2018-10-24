import React from "react";
import "./ActionBar.scss";

import BaseActions from "./BaseActions";
import Shop from "./Shop";

const ActionBar = ({
  isAlive,
  takeRest,
  increaseStr,
  increaseDex,
  increaseLck,
  increaseAppr,
  increaseMoney,
  actionsLeft,
  startCombat,
  currentTab,
  otherTab,
  changeTabs,
  changeTabText,
  inCombat
}) => {
  return (
    <div className="action-bar">
      {!isAlive && (
        <div class="major-status">
          You Are Dead
          <span>💀</span>
        </div>
      )}
      {inCombat && (
        <div class="major-status">
          in Combat
          <span>⚔️</span>
        </div>
      )}
      <h2>
        Actions Left: <span>{actionsLeft}</span>
      </h2>
      <div className="action change-tab" onClick={changeTabs}>
        {changeTabText}
      </div>
      {currentTab === "baseActions" ? (
        <BaseActions
          takeRest={takeRest}
          increaseStr={increaseStr}
          increaseDex={increaseDex}
          increaseLck={increaseLck}
          increaseAppr={increaseAppr}
          increaseMoney={increaseMoney}
          startCombat={startCombat}
        />
      ) : (
        <Shop />
      )}
    </div>
  );
};

export default ActionBar;
