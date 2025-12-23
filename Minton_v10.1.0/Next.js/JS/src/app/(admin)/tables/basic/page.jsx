import React from "react";
import AllBasicTables from "./AllBasicTables";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Basic Tables"
};
const Tables = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Tables",
      path: "/tables/basic"
    }, {
      label: "Basic Tables",
      path: "/tables/basic",
      active: true
    }]} title={"Basic Tables"} />

      <AllBasicTables />
    </React.Fragment>;
};
export default Tables;