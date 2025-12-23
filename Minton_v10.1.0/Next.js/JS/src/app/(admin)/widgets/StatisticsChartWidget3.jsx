"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
// components
import { ChartStatistics } from "@/components";
const StatisticsChartWidget3 = () => {
  const apexOpts = {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "65%"
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    stroke: {
      width: 0,
      curve: "smooth"
    },
    colors: ["#3bafda"],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: seriesName => {
            return "";
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  const apexData = [{
    data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]
  }];
  return <div className="card">
      <div className="card-body">
        <h4 className="header-title mb-3">Sales Status</h4>

        <div className="widget-chart text-center">
          <ReactApexChart options={apexOpts} series={apexData} type="bar" height={165} width={250} className="apex-charts mt-0" />
          <div className="row mt-3">
            <div className="col-4">
              <ChartStatistics title="Target" stats="$825" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last week" stats="$423" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last Month" stats="$806" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default StatisticsChartWidget3;