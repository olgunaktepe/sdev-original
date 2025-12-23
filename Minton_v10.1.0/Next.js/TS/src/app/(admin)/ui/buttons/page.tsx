import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const AllButtons = dynamic(() => import('./AllButtons'))
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Buttons",
}

const Buttons = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/buttons" },
          { label: "Buttons", path: "/ui/buttons", active: true },
        ]}
        title={"Buttons"}
      />

      <AllButtons />
    </React.Fragment>
  );
};

export default Buttons;
