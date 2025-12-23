import React from "react";
import dynamic from "next/dynamic";
const AllGeneralUi = dynamic(() => import('./AllGeneralUi'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "GeneralUI"
};
const GeneralUI = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/general"
    }, {
      label: "General UI",
      path: "/ui/general",
      active: true
    }]} title={"General UI"} />
      <AllGeneralUi />
    </>;
};
export default GeneralUI;