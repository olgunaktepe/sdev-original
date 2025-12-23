import React from "react";
import { Metadata } from "next";
import AllBasicTables from "./AllBasicTables";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Basic Tables",
}

const Tables = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Tables", path: "/tables/basic" },
          { label: "Basic Tables", path: "/tables/basic", active: true },
        ]}
        title={"Basic Tables"}
      />

      <AllBasicTables />
    </React.Fragment>
  );
};

export default Tables;
