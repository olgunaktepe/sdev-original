"use client";

import React from "react";
import classNames from "classnames";
import CountUp from "react-countup";
const Statistics = ({
  stats,
  description,
  counterOptions,
  variant
}) => {
  return <div className="card widget-simple text-center">
      <div className="card-body">
        <h3 className={classNames("mt-0", "text-" + variant)}>
          <span>
            <CountUp duration={1} end={stats} {...counterOptions} />
          </span>
        </h3>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </div>;
};
export default Statistics;