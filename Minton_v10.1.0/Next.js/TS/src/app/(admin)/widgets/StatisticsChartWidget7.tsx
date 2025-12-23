"use client"
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import { ChartStatistics } from "@/components";

const StatisticsChartWidget7 = () => {
  const apexOpts: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "65%",
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      width: [1.5],
      curve: "straight",
    },
    colors: ["#1abc9c", "#f1556c"],
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

  const apexData = [
    {
      type: "bar",
      data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
    },
    {
      type: "line",
      data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title mb-3">Recent Users</h4>

        <div className="widget-chart text-center">
          <ReactApexChart
            options={apexOpts}
            series={apexData}
            type="line"
            height={165}
            width={215}
            className="apex-charts mt-0"
          />
          <div className="row mt-3">
            <div className="col-4">
              <ChartStatistics title="Target" stats="$1022" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last week" stats="$538" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last Month" stats="$988" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChartWidget7;
