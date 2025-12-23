import React from "react";
import AllFormElements from "./AllFormElements";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Form Elements"
};
const BasicForms = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Forms",
      path: "/forms/basic"
    }, {
      label: "Form Elements",
      path: "/forms/basic",
      active: true
    }]} title={"Form Elements"} />
      <AllFormElements />
    </React.Fragment>;
};
export default BasicForms;