import React from "react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import EmailList from "@/app/(admin)/apps/email/inbox/EmailList";
export const metadata = {
  title: "Inbox"
};
// Inbox
const Inbox = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Email",
      path: "/apps/email/inbox"
    }, {
      label: "Inbox",
      path: "/apps/email/inbox",
      active: true
    }]} title={"Inbox"} />

      <div className="row">
        <div className="col">
          <EmailList />
        </div>
      </div>
    </>;
};
export default Inbox;