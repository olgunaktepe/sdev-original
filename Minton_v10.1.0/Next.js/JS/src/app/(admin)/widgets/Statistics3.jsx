import React from "react";
import classNames from "classnames";
const Statistics3 = ({
  stats,
  icon,
  variant,
  title,
  trend
}) => {
  return <div className="card widget-icon">
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div className="avatar-lg">
            <i className={classNames("avatar-title", "display-4", "m-0", "text-" + variant, icon)}></i>
          </div>
          <div className="wid-icon-info flex-1 text-end">
            <p className="text-muted mb-1 font-13 text-uppercase">{title}</p>
            <h4 className="mb-1 counter">{stats}</h4>
            <small className={classNames("text-" + trend.variant)}>
              <b>{trend.value}</b>
            </small>
          </div>
        </div>
      </div>
    </div>;
};
export default Statistics3;