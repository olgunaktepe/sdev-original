import React from "react";
import { Metadata } from "next";

// components
import  PageBreadcrumb  from "@/components/PageBreadcrumb";
import KanbanBoard from "@/app/(admin)/apps/tasks/kanban/KanbanBoard";

export const metadata: Metadata = {
  title: "Kanban Board",
}

// kanban
const Kanban = () => {

  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Tasks", path: "apps/tasks/kanban" },
          { label: "Kanban Board", path: "apps/tasks/kanban", active: true },
        ]}
        title={"Kanban Board"}
      />
      <div className="row">
        <KanbanBoard />
      </div>
    </>
  );
};

export default Kanban;
