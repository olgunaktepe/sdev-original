"use client";

import React from "react";
import { Dropdown } from "react-bootstrap";
// components
import { ChartStatistics } from "@/components";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
const SalesChart = () => {
  const apexOpts = {
    chart: {
      height: 265,
      type: "line",
      stacked: false,
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [1, 2],
      curve: "smooth"
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    colors: ["#3bafda", "#1abc9c"],
    fill: {
      opacity: [0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ["01/01/2020", "02/01/2020", "03/01/2020", "04/01/2020", "05/01/2020", "06/01/2020", "07/01/2020", "08/01/2020", "09/01/2020", "10/01/2020", "11/01/2020"],
    markers: {
      size: 0
    },
    legend: {
      offsetY: 5
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + "k";
        },
        offsetX: -10
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " Dollars";
          }
          return y;
        }
      }
    },
    grid: {
      borderColor: "#f1f3fa",
      padding: {
        bottom: 10
      }
    }
  };
  const apexData = [{
    name: "Desktops",
    type: "area",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  }, {
    name: "Laptops",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }];
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

        <h4 className="header-title">Products Sales</h4>

        <div className="text-center mt-3">
          <div className="row pt-2">
            <div className="col-4">
              <ChartStatistics title="Target" stats="$56,214" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last week" stats="$840" icon="fe-arrow-up" variant="success" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last Month" stats="$7,845" icon="fe-arrow-down" variant="danger" />
            </div>
          </div>

          <div dir="ltr">
            <ReactApexChart options={apexOpts} series={apexData} type="line" height={265} className="apex-charts" />
          </div>
        </div>
      </div>
    </div>;
};
export default SalesChart;