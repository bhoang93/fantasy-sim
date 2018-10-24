import React from "react";

const BaseActions = ({
  takeRest,
  increaseStr,
  increaseDex,
  increaseLck,
  increaseAppr,
  increaseMoney,
  actionsLeft,
  startCombat
}) => {
  return (
    <div>
      <div className="action take-rest" onClick={takeRest}>
        Go To Sleep <span>💤</span>
      </div>

      <div className="action-block training-actions">
        <h3>Training</h3>
        <div className="action" onClick={increaseStr}>
          Weight Training
        </div>
        <div className="action" onClick={increaseDex}>
          Run Through Forest
        </div>
        <div className="action" onClick={increaseAppr}>
          Groom Yourself
        </div>
      </div>

      <div className="action-block adventure-actions">
        <h3>Adventures</h3>
        <div className="action" onClick={startCombat}>
          Fight Monsters
        </div>
        <div className="action" onClick={increaseMoney}>
          Work Odd Job
        </div>
      </div>
    </div>
  );
};

export default BaseActions;
