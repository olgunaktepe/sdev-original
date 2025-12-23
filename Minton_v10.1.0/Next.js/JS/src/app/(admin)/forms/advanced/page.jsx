import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import AllAdvancedElements from "./AllAdvancedElements";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Form Advanced"
};
const FormAdvanced = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Forms",
      path: "/forms/advanced"
    }, {
      label: "Form Advanced",
      path: "/forms/advanced",
      active: true
    }]} title={"Form Advanced"} />

      <AllAdvancedElements />
    </React.Fragment>;
};
export default FormAdvanced;