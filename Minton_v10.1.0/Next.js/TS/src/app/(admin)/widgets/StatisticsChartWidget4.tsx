"use client"
import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

// components
import { ChartStatistics } from "@/components";

const StatisticsChartWidget4 = () => {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#e3eaef", "#3bafda", "#1abc9c", "#f1556c"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName: string) => {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const series = [20, 40, 30, 10];
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title mb-3">Sales Status</h4>

        <div className="widget-chart text-center">
          <ReactApexChart
            type="pie"
            options={options}
            series={series}
            height={168}
            className="apex-charts mt-0"
          />

          <div className="row mt-3">
            <div className="col-4">
              <ChartStatistics title="Target" stats="$982" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last week" stats="$525" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last Month" stats="$937" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChartWidget4;
