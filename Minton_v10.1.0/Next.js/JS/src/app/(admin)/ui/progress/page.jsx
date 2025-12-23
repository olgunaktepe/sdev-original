import React from "react";
import dynamic from "next/dynamic";
const AllProgressBars = dynamic(() => import('./AllProgressBars'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Progress"
};
const ProgressBarExamples = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/progressBar"
    }, {
      label: "Progress",
      path: "/ui/progressBar",
      active: true
    }]} title={"Progress"} />
      <AllProgressBars />
    </React.Fragment>;
};
export default ProgressBarExamples;