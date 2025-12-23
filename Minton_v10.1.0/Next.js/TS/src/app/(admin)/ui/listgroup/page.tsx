import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const AllListGroups = dynamic(() => import('./AllListGroups'))

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

export const metadata: Metadata = {
  title: "List Group"
}

const ListGroups = () => {
  return (
    <React.Fragment>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Base UI", path: "/ui/listgroups" },
          { label: "List Group", path: "/ui/listgroups", active: true },
        ]}
        title={"List Group"}
      />

      <AllListGroups />
    </React.Fragment>
  );
};

export default ListGroups;
