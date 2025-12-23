import React from "react";
import AllSweetAlerts from "./AllSweetAlerts";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Sweet Alerts"
};
const SweetAlerts = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Extended UI",
      path: "/extended-ui/sweet-alert"
    }, {
      label: "Sweet Alerts",
      path: "/extended-ui/sweet-alert",
      active: true
    }]} title={"Sweet Alerts"} />

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Examples</h4>

              <p className="sub-header">
                A beautiful, responsive, customizable, accessible (WAI-ARIA)
                replacement for JavaScript&apos;s popup boxes
              </p>
              <table className="table table-borderless table-centered mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{
                    width: "50%"
                  }}>Alert Type</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <AllSweetAlerts />
              </table>
            </div>
          </div>
        </div>
      </div>
    </>;
};
const SPage = () => {
  return <SweetAlerts></SweetAlerts>;
};
export default SPage;