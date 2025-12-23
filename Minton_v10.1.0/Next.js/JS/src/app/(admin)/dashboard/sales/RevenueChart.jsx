"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
import { Dropdown } from "react-bootstrap";
// components
import { ChartStatistics } from "@/components";
const RevenueChart = () => {
  const apexOpts = {
    chart: {
      height: 265,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "25%"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    legend: {
      show: false
    },
    colors: ["#3bafda", "#e3eaef"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        // formatter: function (val) {
        //   return val + "k";
        // },
        offsetX: -15
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$" + val + "k";
      //   },
      // },
    }
  };
  const apexData = [{
    name: "Actual",
    data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81]
  }, {
    name: "Projection",
    data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59]
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

        <h4 className="header-title">Revenue Report</h4>

        <div className="text-center mt-3">
          <div className="row pt-2">
            <div className="col-4">
              <ChartStatistics title="Target" stats="$12,365" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last week" stats="$365" icon="fe-arrow-down" variant="danger" />
            </div>
            <div className="col-4">
              <ChartStatistics title="Last Month" stats="$8,501" icon="fe-arrow-up" variant="success" />
            </div>
          </div>

          <div dir="ltr">
            <ReactApexChart options={apexOpts} series={apexData} type="bar" height={265} className="apex-charts" />
          </div>
        </div>
      </div>
    </div>;
};
export default RevenueChart;