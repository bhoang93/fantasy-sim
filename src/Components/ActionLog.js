import React from "react";
import "./ActionLog.scss";

const ActionLog = ({ actions }) => {
  return (
    <div className="action-log">
      {actions.map(action => {
        return <p className="action-report">{action}</p>;
      })}
    </div>
  );
};

export default ActionLog;
