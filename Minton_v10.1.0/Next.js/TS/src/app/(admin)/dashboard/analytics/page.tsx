import React from "react";
import Statistics from "./Statistics";
import BrowserUsage from "./BrowserUsage";
import TrafficSources from "./TrafficSources";
import Channels from "./Channels";
import SocialMediaTraffic from "./SocialMediaTraffic";
import EngagementOverviews from "./EngagementOverviews";

// component
import PageBreadcrumb  from "@/components/PageBreadcrumb";

// dummy data
import {
  sessionSummary,
  browserUsageData,
  trafficSources,
  channels,
  socialMediaTraffic,
  engagementOverview,
} from "./data";
import DismissableAlert from "./DismissableAlert";
import SessionOverview from "./SessionOverview";

const AnalyticsDashboard = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Dashboards", path: "/dashboard/analytics" },
          { label: "Analytics", path: "dashboard/analytics", active: true },
        ]}
        title={"Analytics"}
      />

      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <DismissableAlert />

          <Statistics
            title="Active Users"
            stats={121}
            trend={{
              title: "Since last month",
              stats: "22506",
              direction: "up",
              rate: "10.25%",
            }}
          />

          <Statistics
            title="Views Per Minute"
            stats={485}
            trend={{
              title: "Since previous week",
              stats: "8541",
              direction: "down",
              rate: "2.63%",
            }}
          />
        </div>
        <div className="col-xl-9 col-lg-8">
          <SessionOverview sessionSummary={sessionSummary} />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <BrowserUsage browserUsageData={browserUsageData} />
        </div>
        <div className="col-xl-6">
          <TrafficSources trafficSources={trafficSources} />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-lg-6">
          <Channels channels={channels} />
        </div>
        <div className="col-xl-4 col-lg-6">
          <SocialMediaTraffic socialMediaTraffic={socialMediaTraffic} />
        </div>
        <div className="col-xl-4 col-lg-6">
          <EngagementOverviews engagementOverview={engagementOverview} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
