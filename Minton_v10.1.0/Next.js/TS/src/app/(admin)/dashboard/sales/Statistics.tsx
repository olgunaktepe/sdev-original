"use client"
import React from "react";

// components
import { StatisticsChartWidget } from "@/components"

const Statistics = () => {
  return (
    <div className="row">
      <div className="col-md-6 col-xl-3">
        <StatisticsChartWidget
          color={"#1abc9c"}
          data={58}
          stats={"268"}
          description={"New Customers"}
        />
      </div>
      <div className="col-md-6 col-xl-3">
        <StatisticsChartWidget
          color={"#3bafda"}
          data={80}
          stats={"8574"}
          description={"Online Orders"}
        />
      </div>
      <div className="col-md-6 col-xl-3">
        <StatisticsChartWidget
          color={"#f672a7"}
          data={77}
          stats={"958.25"}
          counterOptions={{
            prefix: "$",
            decimals: 2,
          }}
          description={"Revenue"}
        />
      </div>
      <div className="col-md-6 col-xl-3">
        <StatisticsChartWidget
          color={"#6c757d"}
          data={35}
          stats={"89.25"}
          counterOptions={{
            prefix: "$",
            decimals: 2,
          }}
          description={"Daily Average"}
        />
      </div>
    </div>
  );
};

export default Statistics;
