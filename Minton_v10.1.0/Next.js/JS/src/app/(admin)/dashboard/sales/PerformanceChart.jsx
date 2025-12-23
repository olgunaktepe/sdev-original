"use client";

import React from "react";
import { Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
// components
import { ChartStatistics } from "@/components";
const PerformanceChart = () => {
  const apexOpts = {
    chart: {
      height: 312,
      type: "donut"
    },
    series: [44, 55, 41, 17],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: 7
    },
    labels: ["Direct", "Affilliate", "Sponsored", "E-mail"],
    colors: ["#3bafda", "#1abc9c", "#f7b84b", "#f672a7"],
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          height: 240
        },
        legend: {
          show: false
        }
      }
    }]
  };
  const apexData = [44, 55, 41, 17];
  return <div className="card">
      <div className="card-body">
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer arrow-none card-drop">
            <i className="mdi mdi-dots-horizontal"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Download</Dropdown.Item>
            <Dropdown.Item>Upload</Dropdown.Item>
            <Dropdown.Item>Action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h4 className="header-title">Projections Vs Actuals</h4>

        <div className="text-center mt-3">
          <div dir="ltr">
            <ReactApexChart options={apexOpts} series={apexData} type="donut" height={307} className="apex-charts" />
          </div>

          <div className="row mt-3">
            <div className="col-4">
              <ChartStatistics title="Target" stats="$8712" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last week" stats="$523" icon="fe-arrow-up" variant="success" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last Month" stats="$965" icon="fe-arrow-down" variant="danger" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PerformanceChart;