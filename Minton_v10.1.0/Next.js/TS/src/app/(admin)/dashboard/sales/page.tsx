import dynamic from "next/dynamic";
import { Metadata } from "next";
import RevenueChart from "@/app/(admin)/dashboard/crm/RevenueChart";
import SalesChart from "@/app/(admin)/dashboard/sales/SalesChart";
import MarketingChart from "@/app/(admin)/dashboard/sales/MarketingChart";
import RevenueChartByLocation from "@/app/(admin)/dashboard/sales/RevenueChartByLocation";
import PerformanceChart from "@/app/(admin)/dashboard/sales/PerformanceChart";

// components
const Statistics = dynamic(() => import('./Statistics'))
const TopSellingProducts = dynamic(() => import('./TopSellingProducts'))
const RevenueHistory = dynamic(() => import('./RevenueHistory'))
import PageBreadcrumb  from "@/components/PageBreadcrumb";

// dummy data
import { products, revenueHistory } from "./data";

export const metadata: Metadata = {
  title: "Sales Dashboard",
}

const SalesDashboard = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Dashboards", path: "/dashboard/sales" },
          { label: "Sales", path: "/dashboard/sales", active: true },
        ]}
        title={"Sales"}
      />

      <Statistics />

      <div className="row">
        <div className="col-xl-4 col-lg-6">
          <RevenueChart />
        </div>
        <div className="col-xl-4 col-lg-6">
          <SalesChart />
        </div>
        <div className="col-xl-4">
          <MarketingChart />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <RevenueChartByLocation />
        </div>
        <div className="col-xl-6">
          <TopSellingProducts products={products} />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <RevenueHistory revenueHistory={revenueHistory} />
        </div>
        <div className="col-xl-4">
          <PerformanceChart />
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
