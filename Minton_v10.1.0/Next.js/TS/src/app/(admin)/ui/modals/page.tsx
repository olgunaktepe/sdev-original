import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const AllModals = dynamic(() => import('./AllModals'))

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Modals"
}

const Modals = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/modals" },
          { label: "Modals", path: "/ui/modals", active: true },
        ]}
        title={"Modals"}
      />

      <AllModals />
    </React.Fragment>
  );
};

export default Modals;
