import React from "react";
import dynamic from "next/dynamic";
const ReadEmail = dynamic(() => import('./ReadEmail'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Read Email"
};
const EmailDetail = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Email",
      path: "/apps/email/details"
    }, {
      label: "Email Read",
      path: "/apps/email/details",
      active: true
    }]} title={"Email Read"} />

      <div className="row">
        <div className="col">
          <ReadEmail />
        </div>
      </div>
    </>;
};
export default EmailDetail;