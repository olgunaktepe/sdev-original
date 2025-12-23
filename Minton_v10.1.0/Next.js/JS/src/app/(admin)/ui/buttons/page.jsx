import React from "react";
import dynamic from "next/dynamic";
const AllButtons = dynamic(() => import('./AllButtons'));
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Buttons"
};
const Buttons = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/buttons"
    }, {
      label: "Buttons",
      path: "/ui/buttons",
      active: true
    }]} title={"Buttons"} />

      <AllButtons />
    </React.Fragment>;
};
export default Buttons;