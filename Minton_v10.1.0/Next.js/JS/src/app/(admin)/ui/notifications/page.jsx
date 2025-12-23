import React from "react";
import dynamic from "next/dynamic";
const AllNotifications = dynamic(() => import('./AllNotifications'));

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
export const metadata = {
  title: "Notifications"
};
const Notifications = () => {
  return <React.Fragment>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Base UI",
      path: "/ui/toasts"
    }, {
      label: "Notifications",
      path: "/ui/notifications",
      active: true
    }]} title={"Notifications"} />

      {/* toasts */}
      <AllNotifications />
    </React.Fragment>;
};
export default Notifications;