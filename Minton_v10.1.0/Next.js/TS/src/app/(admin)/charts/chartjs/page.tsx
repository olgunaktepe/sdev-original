import React from "react";
import { Metadata } from "next";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import LineChart from "@/app/(admin)/charts/chartjs/LineChart";
import BarChart from "@/app/(admin)/charts/chartjs/BarChart";
import PieChart from "@/app/(admin)/charts/chartjs/PieChart";
import DonutChart from "@/app/(admin)/charts/chartjs/DonutChart";
import PolarChart from "@/app/(admin)/charts/chartjs/PolarChart";
import RadarChart from "@/app/(admin)/charts/chartjs/RadarChart";


export const metadata: Metadata = {
  title: "Chartjs",
}
const ChartJS = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Charts", path: "/charts/chartjs" },
          { label: "Chartjs", path: "/charts/chartjs", active: true },
        ]}
        title={"Chartjs"}
      />

      <div className="row">
        <div className="col-lg-6">
          <LineChart />
        </div>
        <div className="col-lg-6">
          <BarChart />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <PieChart />
        </div>
        <div className="col-lg-6">
          <DonutChart />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <PolarChart />
        </div>
        <div className="col-lg-6">
          <RadarChart />
        </div>
      </div>
    </>
  );
};

export default ChartJS;
