import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const TodoList = dynamic(() => import('@/components/TodoList'))
const PerformanceDetails = dynamic(() => import('./PerformanceDetails'))
const RecentLeads = dynamic(() => import('./RecentLeads'))
const Statistics = dynamic(() => import('./Statistics'))
import RevenueChart from "@/app/(admin)/dashboard/crm/RevenueChart";
import CampaignsChart from "@/app/(admin)/dashboard/crm/CampaignChart";

// component
import PageBreadcrumb from "@/components/PageBreadcrumb";

// data
import { performanceDetails, recentLeads } from "./data";

export const metadata: Metadata = {
  title: "CRM Dashboard",
}

const CRMDashboard = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Dashboards", path: "/dashboard/crm" },
          { label: "CRM", path: "dashboard/crm", active: true },
        ]}
        title={"CRM"}
      />

      <Statistics />

      <div className="row">
        <div className="col-xl-4">
          <CampaignsChart />
        </div>
        <div className="col-xl-8">
          <RevenueChart />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-5">
          <PerformanceDetails performanceDetails={performanceDetails} />
        </div>
        <div className="col-xl-7">
          <div className="row">
            <div className="col-lg-6">
              <RecentLeads recentLeads={recentLeads} />
            </div>
            <div className="col-lg-6">
              <TodoList addTodo={true} height={"292px"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CRMDashboard;
