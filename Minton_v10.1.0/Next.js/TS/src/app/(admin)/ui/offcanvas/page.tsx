import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const AllOffcanvas = dynamic(() => import('./AllOffcanvas'))

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Offcanvas"
}

const Offcanvases = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/offcanvas" },
          { label: "Offcanvas", path: "/ui/offcanvas", active: true },
        ]}
        title={"Offcanvas"}
      />

      <AllOffcanvas />
    </>
  );
};

export default Offcanvases;
