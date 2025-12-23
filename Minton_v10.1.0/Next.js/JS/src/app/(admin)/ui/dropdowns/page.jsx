import React from "react";
import dynamic from "next/dynamic";
const AllDropdowns = dynamic(() => import('./AllDropdowns'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Dropdowns"
};
const Dropdowns = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/dropdowns"
    }, {
      label: "Dropdowns",
      path: "/ui/dropdowns",
      active: true
    }]} title={"Dropdowns"} />

      <div className="row">
        <div className="col-xs-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">Examples</h4>
              <p className="sub-header">
                Toggle contextual overlays for displaying lists of links and
                more with the Bootstrap dropdown plugin.
              </p>

              <AllDropdowns />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>;
};
export default Dropdowns;