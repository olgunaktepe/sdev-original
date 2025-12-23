import React from "react";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starter Page",
}

const Starter = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Extra Pages", path: "/pages/starter" },
          { label: "Starter", path: "/pages/starter", active: true },
        ]}
        title={"Starter"}
      />
    </>
  );
};

export default Starter;
