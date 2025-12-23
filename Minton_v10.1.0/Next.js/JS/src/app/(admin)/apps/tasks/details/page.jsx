import React from "react";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Task from "./Task";
import Comments from "./Comments";
import Attachments from "./Attachments";

// dummy data
import { tasks } from "./data";
export const metadata = {
  title: "Task Detail"
};

// TaskDetails
const TaskDetails = () => {
  const selectedTask = tasks[0];
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Tasks",
      path: "/apps/tasks/details"
    }, {
      label: "Task Detail",
      path: "/apps/tasks/details",
      active: true
    }]} title={"Task Detail"} />
      <div className="row">
        <div className="col-xl-8">
          <Task task={selectedTask} />
          <Attachments />
        </div>
        <div className="col-xl-4">
          <Comments />
        </div>
      </div>
    </>;
};
export default TaskDetails;