import React from "react";
import dynamic from "next/dynamic";
const AllPlaceholders = dynamic(() => import('./AllPlaceholders'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Placeholders"
};
const Placeholders = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/placeholders"
    }, {
      label: "Placeholders",
      path: "/ui/placeholders",
      active: true
    }]} title={"Placeholders"} />
      <AllPlaceholders />
    </>;
};
export default Placeholders;