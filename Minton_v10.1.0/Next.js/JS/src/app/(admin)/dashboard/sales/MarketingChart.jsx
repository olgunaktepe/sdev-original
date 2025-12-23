"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
import { Dropdown } from "react-bootstrap";
const MarketingChart = () => {
  const apexOpts = {
    chart: {
      height: 274,
      type: "radar",
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: 0
    },
    fill: {
      opacity: 0.4
    },
    markers: {
      size: 0
    },
    legend: {
      show: false
    },
    colors: ["#3bafda", "#1abc9c", "#f7b84b"],
    labels: ["2011", "2012", "2013", "2014", "2015", "2016"]
  };
  const apexData = [{
    name: "Series 1",
    data: [80, 50, 30, 40, 100, 20]
  }, {
    name: "Series 2",
    data: [20, 30, 40, 80, 20, 80]
  }, {
    name: "Series 3",
    data: [44, 76, 78, 13, 43, 10]
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

        <h4 className="header-title">Marketing Reports</h4>
        <p className="text-muted mb-0">1 Mar - 31 Mar Showing Data</p>

        <div dir="ltr">
          <ReactApexChart options={apexOpts} series={apexData} type="radar" height={274} className="apex-charts" />
        </div>

        <div className="row text-center">
          <div className="col-6">
            <p className="text-muted mb-1">This Month</p>
            <h3 className="mt-0 font-20">
              <span className="align-middle">$120,254</span>{" "}
              <small className="badge badge-soft-success font-12">+15%</small>
            </h3>
          </div>

          <div className="col-6">
            <p className="text-muted mb-1">Last Month</p>
            <h3 className="mt-0 font-20">
              <span className="align-middle">$98,741</span>{" "}
              <small className="badge badge-soft-danger font-12">-5%</small>
            </h3>
          </div>
        </div>
      </div>
    </div>;
};
export default MarketingChart;