import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const ManageTickets = dynamic(() => import('./ManageTickets'))
import Statistics from "./Statistics";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// dummy data
import { ticketDetails } from "./data";

export const metadata: Metadata = {
  title: "Tickets",
}

const List = () => {
  return (
    <>
      <PageBreadcrumb
        breadCrumbItems={[
          { label: "Apps", path: "/apps/tickets" },
          { label: "Tickets", path: "/apps/tickets", active: true },
        ]}
        title={"Tickets"}
      />
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="row">
                  <div className="col-md-6 col-xl-3">
                    <Statistics
                      icon="fe-tag"
                      stats="25563"
                      desc="Total Tickets"
                    />
                  </div>
                  <div className="col-md-6 col-xl-3">
                    <Statistics
                      icon="fe-archive"
                      textClass="text-warning"
                      stats="6952"
                      desc="Pending Tickets"
                    />
                  </div>
                  <div className="col-md-6 col-xl-3">
                    <Statistics
                      icon="fe-shield"
                      textClass="text-success"
                      stats="18361"
                      desc="Closed Tickets"
                    />
                  </div>
                  <div className="col-md-6 col-xl-3">
                    <Statistics
                      icon="fe-delete"
                      textClass="text-danger"
                      stats="250"
                      desc="Deleted Tickets"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <ManageTickets ticketDetails={ticketDetails} />
        </div>
      </div>
    </>
  );
};

export default List;
