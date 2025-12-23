import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const AllPlaceholders = dynamic(() => import('./AllPlaceholders'))

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Placeholders"
}

const Placeholders = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/placeholders" },
          { label: "Placeholders", path: "/ui/placeholders", active: true },
        ]}
        title={"Placeholders"}
      />
      <AllPlaceholders />
    </>
  );
};

export default Placeholders;
